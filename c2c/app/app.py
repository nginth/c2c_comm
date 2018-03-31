import os
from flask import Flask, abort, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

from app.auth import init_auth

def create_app(config='config.json'):
    app = Flask(__name__)
    CORS(app)    
    app.config.from_json(config)
    auth = init_auth(app)

    @app.route("/api")
    def api_test():
        return 'hello from the API :)'

    db.init_app(app)
    from app import models
    with app.app_context():        
        db.create_all()

    from .api.users import users_blueprint
    app.register_blueprint(users_blueprint, url_prefix='/api/users')
    
    return app