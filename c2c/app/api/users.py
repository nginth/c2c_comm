from flask import Blueprint, jsonify, request, g, current_app
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.models import User
from app.auth import auth

users_blueprint = Blueprint('users', __name__)

@users_blueprint.route("/register", methods=['POST'])
def register():    
    username = request.json.get('username')
    password = request.json.get('password')

    if username is None or password is None:
        abort(400, 'Missing username or password.')
    if User.query.filter_by(username = username).first() is not None:
        abort(400, 'User already exists.')

    user = User(username = username)
    user.hash_password(password)
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

def generate_auth_token(user, expiration = 600):
    s = Serializer(current_app.config['SECRET_KEY'], expires_in = expiration)
    return s.dumps({ 'id': user.id })