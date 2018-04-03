import os
from flask import Flask, abort, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()


def create_app(config='config.json'):
    app = Flask(__name__)  
    app.config.from_json(config)
    CORS(app)

    db.init_app(app)
    from app import models
    with app.app_context():        
        db.configure_mappers()
        db.create_all()

    from app.auth import init_auth
    auth = init_auth(app)

    from .api.users import users_blueprint
    app.register_blueprint(users_blueprint, url_prefix='/api/users')

    @app.route("/api")
    def api_test():
        return 'hello from the API :)'
    
    return app