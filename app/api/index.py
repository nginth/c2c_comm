from flask import Blueprint

index_blueprint = Blueprint('index', __name__)

@index_blueprint.route('/')
def get_albums():
    return 'Hello world.'
