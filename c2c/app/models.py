from flask_sqlalchemy import BaseQuery
# from sqlalchemy_searchable import make_searchable, SearchQueryMixin
from sqlalchemy_utils.types import TSVectorType
from passlib.apps import custom_app_context
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app.app import db

# make_searchable()

# class SearchQuery(BaseQuery, SearchQueryMixin):
#     pass

class User(db.Model):        
    __tablename__ = 'user'
    # query_class = SearchQuery

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.UnicodeText, index=True, nullable=False)    
    password_hash = db.Column(db.String(128))
    first_name = db.Column(db.UnicodeText)
    last_name = db.Column(db.UnicodeText)
    email = db.Column(db.UnicodeText)

    def hash_password(self, password):
        self.password_hash = custom_app_context.encrypt(password)

    def verify_password(self, password):
        return custom_app_context.verify(password, self.password_hash)    
  
    # search_vector = db.Column(TSVectorType('first_name'))

    # def __serialize__(self):
    #     return {
    #         "id": self.id,
    #         "name": self.name,
    #         "playcount": self.playcount,
    #         "duration": self.duration,
    #         "spotifyUri": self.spotify_uri,
    #         "imageUrl": self.image_url,
    #         "album": {
    #             "id": self.album_id,
    #             "name": self.album.name if self.album else None
    #         },
    #         "artist": {
    #             "id": self.artist_id,
    #             "name": self.artist.name if self.artist else None
    #         }
    #     }

    def __repr__(self):
        return '<User {}: {!r}>'.format(self.id, self.name)