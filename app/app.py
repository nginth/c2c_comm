import os
from flask import Flask, render_template, send_from_directory
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# db = SQLAlchemy()


def create_app(config='config.json'):
    app = Flask(__name__, static_folder='../static')
    CORS(app)
    
    @app.route("/")
    def index():
        return send_from_directory('../static', 'index.html')

    @app.route("/api")
    def api_test():
        return 'hello from the API :)'

    # app.config.from_json(config)

    # db.init_app(app)
    # from app import models
    # with app.app_context():
    #     db.configure_mappers()
    #     db.create_all()

    # # these are down here to avoid circular import problems
    # from .api.index import index_blueprint

    # app.register_blueprint(index_blueprint, url_prefix='')

    return app