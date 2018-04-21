from flask import Blueprint, jsonify, request, g, current_app, abort, make_response
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.models import User, Internship
from app.auth import auth
from app.app import db
import csv
import io

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route("/register", methods=['POST'])
def register():    
    print("Register")
    basic = request.get_json().get('basic')
    username = basic.get('username')
    password = basic.get('password')

    print(basic)

    if username is None or password is None:
        abort(400, 'Bad Request. Missing username or password.')
    # if User.query.filter_by(username = username).first() is not None:
    #     abort(400, 'User already exists.')


    user = user_from_json(request.get_json())
    user.hash_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify({ 'username': user.username, 'id': user.id }), 200
    

@users_blueprint.route("/login", methods=['POST'])
def login_user():
    print("Login User")
    if not request.get_json():
        abort(400, 'Malformatted JSON request.')

    data = request.get_json()
    username = data.get('username')
    password = data.get('password') 
    
    return login(username, password)

@auth.verify_password
def login(username, password):
    # print("Login User")
    # if not request.get_json():
    #     abort(400, 'Malformatted JSON request.')

    # data = request.get_json()
    # username = data.get('username')
    # password = data.get('password') 
    

    # print(request.get_json())
    
    user = User.query.filter_by(username = username).first()
    if not user:
        return "User not found", 404
    if not user.verify_password(password):
        return "Bad password", 401

    #is this setting a global user? Bad! - Alex
    print(user)
    g.user = user
    # token = get_token()
    # print(token)
    return get_user_by_name(username), 200

@users_blueprint.route("/token")
@auth.login_required
def get_token():
    token = generate_auth_token(g.user)
    return jsonify({ 'token': token.decode('ascii') })

@users_blueprint.route("/authtest")
@auth.login_required
def authtest():
    return 'u good: ' + g.user.username


@users_blueprint.route("/edit", methods=['POST'])
@auth.login_required
def edit_user():
    data = request.get_json()
    user_id = data.get('id')
    print(data)
    user = User.query.filter_by(id=user_id).first()

    basic = data.get('basic')

    # basic
    user.email = basic.get('email')
    user.first_name = basic.get('firstName')
    user.last_name = basic.get('lastName')
    user.profile_pic = basic.get('avatar')
    user.current_employer = basic.get('employer')
    user.current_school = basic.get('school')
    expected_grad = basic.get('expectedGrad')
    if expected_grad:
        user.expected_grad = expected_grad

    # about
    about = data.get('about')
    if about:
        user.bio = about.get('bio')
        #user.interests = ', '.join(about.get('interests'))

    # social
    social = data.get('social')  
    if social:
        user.facebook = social.get('facebook')
        user.linkedin = social.get('linkedin')
        user.twitter = social.get('twitter')
        user.github = social.get('github')
        user.website = social.get('website')

    # c2c
    c2c = data.get('c2c')
    if c2c:
        user.grad_year_program = c2c.get('graduation')
        user.favorite_workshop = c2c.get('workshop')
        user.favorite_volunteer = c2c.get('volunteer')
        for internship in c2c.get('internships'):
            user.internships.clear()
            user.internships.append(internship_from_json(internship))

    # highschool
    highschool = data.get('highschool')
    if highschool:
        user.high_school_name = highschool.get('name')
        user.high_school_graduation = highschool.get('graduation')

    db.session.commit()

    return jsonify(user.serialize()), 200

@users_blueprint.route("/list", methods=['GET'])
@auth.login_required
def get_all_users():    
    users = User.query.paginate()
    return jsonify({
        'page': users.page,
        'pages': users.pages,
        'next': users.next_num,
        'prev': users.prev_num,
        'per_page': users.per_page,
        'users': [user.serialize() for user in users.items]
    })

@users_blueprint.route("/<int:user_id>", methods=['GET'])
@auth.login_required
def get_user_by_id(user_id): 
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        abort(404, 'User not found.')
    return jsonify(user.serialize()) 

@users_blueprint.route("/<user_name>", methods=['GET'])
@auth.login_required
def get_user_by_name(user_name):    
    user = User.query.filter_by(username=user_name).first()
    if user is None:
        abort(404, 'User not found.')
    return jsonify(user.serialize())

@users_blueprint.route("/search/<query_term>", methods=['GET'])
@auth.login_required
def search(query_term):    
    users = User.query.search(query_term, sort=True).paginate() 
    return jsonify({
        'page': users.page,
        'pages': users.pages,
        'next': users.next_num,
        'prev': users.prev_num,
        'per_page': users.per_page,
        'users': [user.serialize() for user in users.items]
    })

def generate_auth_token(user, expiration = 600):
    s = Serializer(current_app.config['SECRET_KEY'], expires_in = expiration)
    return s.dumps({ 'id': user.id })

def user_from_json(json):
    basic = json.get('basic')
    if basic is None:
        abort(400, 'Malformatted JSON request.')

    username = basic.get('username')
    password = basic.get('password')

    if username is None or password is None:
        abort(400, 'Missing username or password.')
    if User.query.filter_by(username = username).first() is not None:
        abort(400, 'User already exists.')
        
    user = User(username=username)
    user.hash_password(password)

    # basic
    user.email = basic.get('email')
    user.first_name = basic.get('firstName')
    user.last_name = basic.get('lastName')
    user.profile_pic = basic.get('avatar')
    user.current_employer = basic.get('employer')
    user.current_school = basic.get('school')
    user.expected_grad = json.get('expectedGrad')

    # about
    about = json.get('about')
    if about:
        user.bio = about.get('bio')
        if about.get('interests'):
            user.interests = ', '.join(about.get('interests'))

    # social
    social = json.get('social')  
    if social:
        user.facebook = social.get('facebook')
        user.linkedin = social.get('linkedin')
        user.twitter = social.get('twitter')
        user.github = social.get('github')
        user.website = social.get('website')

    # c2c
    c2c = json.get('c2c')
    if c2c:
        user.grad_year_program = c2c.get('graduation')
        user.favorite_workshop = c2c.get('workshop')
        user.favorite_volunteer = c2c.get('volunteer')
        for internship in c2c.get('internships'):
            user.internships.append(internship_from_json(internship))

    # highschool
    highschool = json.get('highschool')
    if highschool:
        user.high_school_name = highschool.get('name')
        user.high_school_graduation = highschool.get('graduation')

    return user

def internship_from_json(json):
    i = Internship()
    i.host = json.get('host')
    i.year = json.get('year')
    return i

@users_blueprint.route("/export", methods=['GET'])
@auth.login_required
def export():
    si = io.StringIO()
    writer = csv.writer(si)
    users = User.query.all()
    # Add header for each column
    header = ['id', 'username', 'firstName', 'lastName', 'employer', 'school', 'expectedGrad', 'email', 'bio', 'interests', 'name', 'graduation', 'linkedin', 'facebook', 
        'twitter', 'github', 'volunteer', 'workshop', 'graduation', 'internships']
    writer.writerow(header)
    # For every user in the database
    for user in users:
        userData = user.serialize()
        userData.get('basic').pop('avatar') # remove the profile picture data
        actualRow = [] # actual row to be written into the csv

        # For each part of the dictionary: id, basic, about, social, c2c, highschool, get the corresponding nested dictionaries to each (Except for id)
        for key,value in userData.items():
            # if it is basic, about, social, c2c, or highschool, then add each value to the actual row
            if type(value) == dict:
                for field, data in value.items():
                    actualRow.append(data)
            else:
                # if it is just the id, then append it to actual row
                actualRow.append(value)
        writer.writerow(actualRow)
    
    response = make_response(si.getvalue())
    response.headers['Content-Disposition'] = 'attachment; filename=report.csv'
    response.headers["Content-type"] = "text/csv"
    return response
