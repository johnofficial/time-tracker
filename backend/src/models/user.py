import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime, Text, CHAR, DATETIME, TIME
from sqlalchemy.orm import relationship
import base.common.orm
import json


class AuthUser(base.common.orm.sql_base):

    __tablename__ = 'auth_users'

    id = Column(CHAR(10), primary_key=True)
    username = Column(String(64), index=True, nullable=False, unique=True)
    password = Column(String(64), nullable=False)
    role_flags = Column(Integer, index=True, nullable=False)
    active = Column(Boolean, index=True, nullable=False, default=False)
    created = Column(DateTime, nullable=False, default=datetime.datetime.now())
    user = relationship('User', uselist=False, back_populates='auth_user')

    def __init__(self, _id, username, password, role_flags=1, active=False):

        self.id = _id
        self.username = username
        self.password = password
        self.role_flags = role_flags
        self.active = active
        self.created = datetime.datetime.now()


class User(base.common.orm.sql_base):

    __tablename__ = 'users'

    id = Column(CHAR(10), ForeignKey(AuthUser.id), primary_key=True)
    first_name = Column(String(64))
    last_name = Column(String(64))

    auth_user = relationship("AuthUser", back_populates="user")

    events = relationship('Event')

    def __init__(self, id_user, first_name, last_name):

        self.id = id_user
        self.first_name = first_name
        self.last_name = last_name

class Event(base.common.orm.sql_base):

    __tablename__ = 'events'

    id = Column(CHAR(10), primary_key=True)
    name = Column(String(128), nullable=False)
    created = Column(DATETIME, nullable=False)
    active = Column(Boolean)
    id_user = Column(CHAR(10), ForeignKey('users.id'))

    tasks = relationship('EventTask')

    def __init__(self, id, name, created, active=False):
        self.id = id
        self.name = name
        self.created = created
        self.active = active
        
    def toJson(self):
        return {
            "id": self.id,
            "name": self.name,
            "created": str(self.created),
            "active": self.active
        }

class EventTask(base.common.orm.sql_base):

    __tablename__ = 'event_tasks'

    id = Column(CHAR(10), primary_key=True)
    start_time = Column(DATETIME)
    end_time = Column(DATETIME)
    period = Column(TIME)
    id_event = Column(CHAR(10), ForeignKey('events.id'))

    def __init__(self, id, start_time, end_time, period):
        self.id = id
        self.start_time = start_time
        self.end_time = end_time
        self.period = period

    def toJson(self):
        return json.dumps({
            "id": self.id,
            "start": str(self.start_time),
            "end": str(self.end_time),
            "period": str(self.period)
        })

def main():
    pass

if __name__ == '__main__':

    main()
