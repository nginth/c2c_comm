from flask import Blueprint, jsonify, request, g, current_app, abort
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.models import User, Internship
from app.auth import auth
from app.app import db

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route("/register", methods=['POST'])
def register():
    if not request.get_json():
        abort(400, 'Malformatted JSON request.')
    
    print(request.get_json())

    user = user_from_json(request.get_json())
    db.session.add(user)
    db.session.commit()

    return jsonify({ 'username': user.username, 'id': user.id }), 200

@users_blueprint.route("/token")
@auth.login_required
def get_token():
    token = generate_auth_token(g.user)
    return jsonify({ 'token': token.decode('ascii') })

@users_blueprint.route("/authtest")
@auth.login_required
def authtest():
    return 'u good: ' + g.user.username

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
    user.first_name = basic.get('lastName')
    user.profile_pic = basic.get('avatar')
    user.current_employer = basic.get('employer')
    user.current_school = basic.get('school')

    # about
    about = json.get('about')
    if about:
        user.bio = about.get('bio')
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