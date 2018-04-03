from flask import Blueprint, jsonify, request, g, current_app, abort
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.models import User
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
        

    # TODO: unmarshall args into user model
    # user.email = json.basic.email

    user = User(username = username)
    user.hash_password(password)

    return user