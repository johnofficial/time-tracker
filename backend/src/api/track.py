# coding= utf-8

from base.application.components import Base
from base.application.components import api
from base.application.components import params
from base.application.components import authenticated
import base.common.orm
from base.common.sequencer import sequencer

import datetime
import decimal
import json




def get_timedelta(task):
    return datetime.timedelta(hours=task.period.hour, minutes=task.period.minute, seconds=task.period.second)


def get_period(event):

    _total = datetime.timedelta(hours=0, minutes=0, seconds=0)
    for task in event.tasks:

        if not task.period:
            _total += datetime.datetime.now() - task.start_time
            continue

        _total += get_timedelta(task)

    return str(_total)



# @authenticated()  # if every http method has to be authenticated
@api(
    URI='/switch/:id_event'
)
class Switch(Base):

    @params(
        {'name': 'id_event', 'type': str, 'doc': 'Id of event what for task starting'}
    )
    def put(self, id_event):
        EventTask, session = base.common.orm.get_orm_model('event_tasks')
        Event, session = base.common.orm.get_orm_model('events')

        def stop_task(task):
            task.end_time = datetime.datetime.now()
            _total = task.end_time - task.start_time
            task.period = _total
            event.active = False
            try:
                session.commit()
                return True
            except Exception as e:
                return False

        event = session.query(Event).filter(Event.id == id_event).one_or_none()
        if not event:
            return self.error('no event')

        if event.active:
            for task in event.tasks:
                if not task.end_time:
                    if stop_task(task):
                        _period = get_period(event)
                        return self.ok({"action": "stopped", "event": event.toJson(), "period": _period})
                    else:
                        return self.error('error stoping event')

        event.active = True
        _id = sequencer().new('t')
        start_time = datetime.datetime.now()
        end_time = None
        period = None

        task = EventTask(_id, start_time, end_time, period)

        try:
            event.tasks.append(task)
            session.commit()
            return self.ok({'action': 'started', "event": event.toJson()})
        except Exception as e:
            return self.error('{}'.format(e))


@api(
    URI='/events'
)
class ManageEvent(Base):

    @authenticated()
    @params(
        {'name': 'event_name', 'type': str, 'doc': 'Name for new event'}
    )
    def post(self, name):
        Event, session = base.common.orm.get_orm_model('events')

        _id = sequencer().new('e')
        event = Event(_id, name, datetime.datetime.now())

        try:
            self.auth_user.user.events.append(event)
            session.commit()
            return self.ok({'added': event.id, 
                'events': [event.toJson() for event in session.query(Event).order_by(Event.created.desc()).all()]})
        except Exception as e:
            return self.error('{}'.format(e))

    @authenticated()
    def get(self):

        _events = []
        for event in self.auth_user.user.events:
            _events.append({
                "id": event.id,
                "name": event.name,
                "active": event.active,
                "created": str(event.created)
            })

        return self.ok({'events': sorted(_events, key=lambda ev: ev['created'], reverse=True)})

@api(
    URI='/event-period/:id_event'
)
class EventPeriod(Base):

    @authenticated()
    @params(
        {'name': 'id_event', 'type': str, 'doc': 'id of event to get period'}
    )
    def get(self, id_event):

        event = None
        for _event in self.auth_user.user.events:
            if _event.id == id_event:
                event = _event
            continue

        if not event:
            return self.error('no event')

        _total = get_period(event)

        return self.ok({
            'event': event.name,
            'period': str(_total)
        })

@api(
    URI='/test'
)
class TestingClass(Base):

    def get(self):

        # from src.models.user import EventTask
        EventTask, _ = base.common.orm.get_orm_model('event_tasks')

        tasks = _.query(EventTask).all()

        task = tasks[0]

        res = []
        for task in tasks:
            res.append(task.toJson())

        for task in res:
            print(task)



