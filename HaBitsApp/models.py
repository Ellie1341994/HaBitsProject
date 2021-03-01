"""
HaBits DB Models
"""
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from datetime import date
# Create your models here.
class User(AbstractUser):
    """
    Custom User Model
    """
    class Meta:
        ordering = ["username"]

class Habit(models.Model):
    """
    Model that registers a user's Habit information
    """
    class TimeFrame(models.TextChoices):
        """
        Habit class's enumeration
        Defines time frames that describe how often a Habit is realized
        """
        DAY = 'D', _('Day')
        WEEK = 'W', _('Week')
        MONTH = 'M', _('Month')

    class DayNames(models.TextChoices):
        """
        Habit class's enumeration
        Enumerates week day names
        Has a method <today> that determines the correct enumeration value
        for today
        """
        MONDAY = 'MO', _('Monday')
        TUESDAY = 'TU', _('Tuesday')
        WEDNESDAY = 'WE', _('Wednesday')
        THURSDAY = 'TH', _('Thursday')
        FRIDAY = 'FR', _('Friday')
        SUNDAY = 'SU', _('Sunday')
        SATURDAY = 'SA', _('Saturday')

        def today(self):
            TODAY = date.today().strftime("%A").upper()
            return [getattr(self, DAY) for DAY in dir(self) if DAY in TODAY].pop()

    # Non-relational fields
        # Mutable
    time_frame = models.CharField(max_length=1, choices=TimeFrame.choices, default=TimeFrame.DAY)
    day = models.CharField(max_length=2,choices=DayNames.choices, default="LU")
    # 24 hours clock
    start_hour = models.PositiveIntegerField(default=0)
    start_minutes = models.PositiveIntegerField(default=0)
    end_hour = models.PositiveIntegerField(default=1)
    end_minutes = models.PositiveIntegerField(default=0)
    date_edited = models.DateTimeField(auto_now=True)
    effectiveness = models.IntegerField(default=0)
    description = models.TextField(default='')
        # Inmutable
    name = models.CharField(max_length=25)
    date_created = models.DateTimeField(auto_now_add=True)
    # Relational fields
    # Inmutable
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="habits")
    class Meta:
        ordering = ["-date_created"]
        constraints = [
            models.CheckConstraint(name="NON_VOID_HABIT_TIME_WINDOW",
                                   check=models.Q(end_hour__gt=models.F("start_hour"))
                                   & models.Q(end_hour__lte=24)
                                   & models.Q(end_minutes__lte=59)
                                   & models.Q(start_minutes__lte=59))]

class Trace(models.Model):
    """
    Model that follows the user consistency of their Habits across time
    """
    class Status(models.TextChoices):
        """
        Pseudo-Enumeration that defines a habit's point in time state
        """
        DONE = 'D', _('Done')
        PENDING = 'P', _('Pending')
        FAILED = 'F', _('Failed')

    # Non-relational fields
    date = models.DateTimeField(auto_now=True)
    state = models.CharField(max_length=1, choices=Status.choices, default=Status.PENDING)
    note = models.TextField(default='')

    # Relational fields
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="traces")
    class Meta:
        ordering = ["-date"]
