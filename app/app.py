import os
from flask import Flask, render_template
# from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

# db = SQLAlchemy()


def create_app(config='config.json'):
    app = Flask(__name__)
    
    @app.route("/api")
    def index():
        return 'hello :)'

    # app.config.from_json(config)
    # CORS(app)

    # db.init_app(app)
    # from app import models
    # with app.app_context():
    #     db.configure_mappers()
    #     db.create_all()

    # # these are down here to avoid circular import problems
    # from .api.index import index_blueprint

    # app.register_blueprint(index_blueprint, url_prefix='')

    return app