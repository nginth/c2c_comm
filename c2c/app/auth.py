from flask import g
from flask_httpauth import HTTPBasicAuth
from app.models import User
from app.app import db

auth = HTTPBasicAuth()

@auth.verify_password
def verify_password(username_or_token, password):
    from app.models import User
    # first try to authenticate by token
    user = User.verify_auth_token(username_or_token)
    if not user:
        # try to authenticate with username/password
        user = User.query.filter_by(username = username_or_token).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True