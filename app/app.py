import os
from flask import Flask, abort, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()


def create_app(config='config.json'):
    app = Flask(__name__)  
    app.config.from_json(config)
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgres://localhost:5432/c2c')
    CORS(app)

    db.init_app(app)
    from . import models
    with app.app_context():        
        db.configure_mappers()
        db.create_all()

    from .auth import init_auth
    auth = init_auth(app)

    from .api.users import users_blueprint
    app.register_blueprint(users_blueprint, url_prefix='/api/users')

    from .api.forum import forum_blueprint
    app.register_blueprint(forum_blueprint, url_prefix='/api/forum')

    @app.route("/api")
    def api_test():
        return 'hello from the API :)'
    
    return app