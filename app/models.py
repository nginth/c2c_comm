from flask_sqlalchemy import BaseQuery
from sqlalchemy_searchable import make_searchable, SearchQueryMixin
from sqlalchemy_utils.types import TSVectorType
from passlib.apps import custom_app_context
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from .app import db

make_searchable(db.metadata)

class SearchQuery(BaseQuery, SearchQueryMixin):
    pass

class Internship(db.Model):
    __tablename__ = 'internship'
    id = db.Column(db.Integer, primary_key=True)
    host = db.Column(db.UnicodeText)
    year = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', back_populates='internships')        

class User(db.Model):        
    __tablename__ = 'user'
    query_class = SearchQuery

    id = db.Column(db.Integer, primary_key=True)
    admin = db.Column(db.Boolean, default=False)

    # basic info
    username = db.Column(db.UnicodeText, index=True, nullable=False)    
    password_hash = db.Column(db.String(128))
    first_name = db.Column(db.UnicodeText)
    last_name = db.Column(db.UnicodeText)
    email = db.Column(db.UnicodeText)
    profile_pic = db.Column(db.UnicodeText)
    bio = db.Column(db.UnicodeText)
    current_employer = db.Column(db.UnicodeText)
    current_school = db.Column(db.UnicodeText)
    
    # high school info
    high_school_name = db.Column(db.UnicodeText)
    high_school_graduation = db.Column(db.Integer)
    
    # socials
    linkedin = db.Column(db.UnicodeText)
    facebook = db.Column(db.UnicodeText)
    twitter = db.Column(db.UnicodeText)
    github = db.Column(db.UnicodeText)

    # c2c info
    favorite_volunteer = db.Column(db.UnicodeText) #TODO: make this a user -> user reference
    favorite_workshop = db.Column(db.UnicodeText)
    grad_year_program = db.Column(db.Integer)
    internships = db.relationship('Internship', back_populates='user')

    search_vector = db.Column(TSVectorType('username', 'first_name', 'last_name', 'bio', 'current_employer', 'current_school', 'high_school_name'))

    def hash_password(self, password):
        self.password_hash = custom_app_context.encrypt(password)

    def verify_password(self, password):
        return custom_app_context.verify(password, self.password_hash)        

    def serialize(self):
        return {
            "id": self.id,
            "basic": {
                "username": self.username,
                "firstName": self.first_name,
                "lastName": self.last_name,
                "employer": self.current_employer,
                "school": self.current_school,
                "avatar": self.profile_pic
            },
            "about": {
                "bio": self.bio, 
                "interests": self.interests

            },
            "highSchool": {
                "name": self.high_school_name,
                "graduation": self.high_school_graduation,
            },
            "social": {
                "linkedin": self.linkedin,
                "facebook": self.facebook,
                "twitter": self.twitter,
                "github": self.github
            },
            "c2c": {
                "volunteer": self.favorite_volunteer,
                "workshop": self.favorite_workshop,
                "graduation": self.grad_year_program,
                "internships": [{
                    "id": internship.id,
                    "host": internship.host,
                    "year": internship.year
                } for internship in self.internships]
            }  
        }

    def __repr__(self):
        return '<User {}: {!r}>'.format(self.id, self.username)