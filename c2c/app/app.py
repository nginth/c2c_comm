import os
from flask import Flask, abort, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

from app.auth import auth

def create_app(config='config.json'):
    app = Flask(__name__)
    CORS(app)
    app.config["SQLALCHEMY_DATABASE_URI"] = "postgres://localhost:5432/c2c"

    @app.route("/api")
    def api_test():
        return 'hello from the API :)'

    @app.route("/api/register", methods=['POST'])
    def register():
        from app.models import User
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
    
    @app.route("/api/token")
    @auth.login_required
    def get_token():
        token = g.user.generate_auth_token()
        return jsonify({ 'token': token.decode('ascii') })


    db.init_app(app)
    from app import models
    with app.app_context():        
        db.create_all()

    return app