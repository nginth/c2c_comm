from flask import Blueprint, jsonify, request, g, current_app, abort
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.models import Post
from app.auth import auth
from app.app import db
import time

forum_blueprint = Blueprint('forum', __name__)

# get thread posts for a given page
@forum_blueprint.route("/forum/<int:page_num>", methods=['GET'])
@auth.login_required
    def getForum():
        posts = db.session.query(Post).order_by(-Post.date.desc()).paginate(page_num, 10, False).items
        threads = [currPost if currPost.thread_id == -1 for currPost in posts]
        return jsonify([post.serialize() for post in threads])

# get replies for given post
@forum_blueprint.route("/forum/<int:post_id>", methods=['GET'])
@auth.login_required
    def getReplies():
        posts = db.session.query(Post).filter_by(thread_id=post_id).all()
        return jsonify([post.serialize() for post in posts])


# add post to db (add to parent thread if needed)
@forum_blueprint.route("/forum", methods=['POST'])
@forum_blueprint.route("/forum/<int:thread_id>/", methods=['POST'])
@auth.login_required
    def addPost(thread_id=-1):

        if not request.get_json():
            abort(400, 'Malformatted JSON request.')

        data = request.get_json()
        title = data.get('title')
        text = data.get('text')
        name = data.get('name')
        user_id = data.get('user_id')

        post = Post()
        post.title = title
        post.text = text
        post.name = name
        post.date = int(time.time())
        post.thread_id = thread_id

        db.session.add(user)
        db.session.commit()

# edit post
@forum_blueprint.route("/forum/<int:post_id>/", methods=['POST'])
@auth.login_required
    def editPost():
        if not request.get_json():
            abort(400, 'Malformatted JSON request.')

        data = request.get_json()
        title = data.get('title')
        text = data.get('text')

        db.session.query().filter_by(id=post_id).update({"title": title, "text": text})
        db.session.commit()

# delete post + replies
@forum_blueprint.route("/forum/<int:post_id>/", methods=['POST'])
@auth.login_required
    def deletePost():
        if not request.get_json():
            abort(400, 'Malformatted JSON request.')

        db.session.query().filter_by(id=post_id).delete()
        db.session.query().filter_by(thread_id=post_id).delete()
        db.session.commit()

