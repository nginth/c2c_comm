from flask import Blueprint, jsonify, request, g, current_app, abort
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.models import Post
from app.auth import auth
from app.app import db
import time

forum_blueprint = Blueprint("forum", __name__)

# get thread post by page
@forum_blueprint.route("/forum/<int:page_num>/", methods=["GET"])
@auth.login_required
def getForum():
    threads = db.session.query(Thread).paginate(page_num, 20, False).order_by(-Thread.date.desc()).all()
    return jsonify([thread.serialize() for thread in threads])

# get replies for given post
@forum_blueprint.route("/forum/<int:thread_id>/", methods=["GET"])
@auth.login_required
def getReplies():
    posts = db.session.query(Post).filter_by(thread_id=thread_id).order_by(-Post.date.desc()).all()
    return jsonify([post.serialize() for post in posts])

# add thread to db
@forum_blueprint.route("/forum/add/new/", methods=["POST"])
@auth.login_required
def addThread():
    if not request.get_json():
        abort(400, "Malformatted JSON request.")

    data = request.get_json()
    title = data.get("title")
    text = data.get("text")
    name = data.get("name")
    user_id = data.get("user_id")

    thread = Thread()
    thread.title = title
    thread.text = text
    thread.name = name
    thread.date = int(time.time())
    thread.user_id = user_id

    db.session.add(thread)
    db.session.commit()

# add post to a thread
@forum_blueprint.route("/forum/add/<int:thread_id>/", methods=["POST"])
@auth.login_required
def addPost(thread_id=-1):
    if not request.get_json():
        abort(400, "Malformatted JSON request.")

    data = request.get_json()
    title = data.get("title")
    text = data.get("text")
    name = data.get("name")
    user_id = data.get("user_id")

    post = Post()
    post.title = title
    post.text = text
    post.name = name
    post.date = int(time.time())
    post.user_id = user_id
    post.thread_id = thread_id

    db.session.add(post)
    db.session.commit()

# edit thread
@forum_blueprint.route("/forum/edit/thread/<int:thread_id>/", methods=["POST"])
@auth.login_required
def editThread():
    if not request.get_json():
        abort(400, "Malformatted JSON request.")

    data = request.get_json()
    title = data.get("title")
    text = data.get("text")
    user_id = data.get("user_id")

    db.session.query(Thread).filter_by(user_id=user_id).filter_by(id=thread_id).update({"title": title, "text": text, "date": int(time.time())})
    db.session.commit()

# edit post
@forum_blueprint.route("/forum/edit/post/<int:post_id>/", methods=["POST"])
@auth.login_required
def editPost():
    if not request.get_json():
        abort(400, "Malformatted JSON request.")

    data = request.get_json()
    text = data.get("text")
    user_id = data.get("user_id")

    db.session.query(Post).filter_by(user_id=user_id).filter_by(id=post_id).update({"text": text, "date": int(time.time())})
    db.session.commit()

# delete thread + replies
@forum_blueprint.route("/forum/delete/thread/<int:thread_id>/", methods=["POST"])
@auth.login_required
def deleteThread():
    if not request.get_json():
        abort(400, "Malformatted JSON request.")

    data = request.get_json()
    user_id = data.get("user_id")

    db.session.query(Thread).filter_by(user_id=user_id).filter_by(id=thread_id).delete()
    db.session.query(Post).filter_by(user_id=user_id).filter_by(thread_id=thread_id).delete()
    db.session.commit()

# delete post
@forum_blueprint.route("/forum/delete/post/<int:post_id>/", methods=["POST"])
@auth.login_required
def deletePost():
    if not request.get_json():
        abort(400, "Malformatted JSON request.")

    data = request.get_json()
    user_id = data.get("user_id")

    db.session.query(Post).filter_by(user_id=user_id).filter_by(id=post_id).delete()
    db.session.commit()
