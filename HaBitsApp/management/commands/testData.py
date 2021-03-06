from django.core.management.base import BaseCommand, CommandError
from HaBitsApp.models import User, Track, Habit
from django.contrib.auth.hashers import make_password
from datetime import datetime, timedelta
from random import random
from math import floor
class Command(BaseCommand):
    help = 'Creates several user habits and a whole year of tracks for some of them'

    def add_arguments(self, parser):
         parser.add_argument(
            '--delete',
            action='store_true',
            help='Deletes data instead of creating it',
        )


    def handle(self, *args, **options):
        if options["delete"]:
            Track.objects.all().delete()
            Habit.objects.all().delete()
            User.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('All data successfully deleted'))
        else:
            # Create user entry
            user = None
            try:
                user = User.objects.create(username="test", password=make_password("testtest"), email="test@test.com")
                user.save()
            except Exception as error:
                print(error)

            habitsData = [("Running", 1), ("Walking", 1), ("Brush my teeth", 2), ("Sleeping", 3)]
            habitName = 0
            dayOffset=1
            # Create habits entries
            habitObjs = []
            initialDate = datetime(2021, 1, 1)
            for data in habitsData:
                try:
                    h = Habit.objects.create(name=data[habitName],
                                             description="Test description for " + data[habitName],
                                         startTime=initialDate + timedelta(days=data[dayOffset]),
                                         endTime=initialDate + timedelta(days=data[dayOffset], hours=1, minutes=30),
                                         user=user
                                         )
                    h.save()
                    habitObjs.append(h)
                except Exception as error:
                    print(error)

            # Create tracks entries
            dayNumber = 0
            maxDays = 200
            for habit in habitObjs:
                if habit.name == "Sleeping":
                    break
                while dayNumber < maxDays:
                    try:
                        randomValue = floor(random() * 3 )
                        trackState = 'D' if dayNumber % 2 == 0 or dayNumber % 3 == 0 else 'F'
                        testDate = habit.startTime + timedelta(days=dayNumber)
                        t = Track.objects.create(dateCreated=testDate,
                                                 effectiveness=( randomValue + 1 ),
                                                 note="Test note number %i" % dayNumber,
                                                 habit=habit,
                                                 state=trackState)
                        t.save()
                    except Exception as error:
                        print(error)
                    dayNumber += 1
                dayNumber = 0

            self.stdout.write(self.style.SUCCESS('Data successfully created'))
