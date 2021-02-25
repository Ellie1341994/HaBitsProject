"""
HaBits DB Models
"""
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

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
        Habit's subclass.
        Defines time frames that describe how often a Habit is realized
        """
        DAY = 'D', _('Day')
        WEEK = 'W', _('Week')
        MONTH = 'M', _('Month')
    # Non-relational fields
    name = models.CharField(max_length=25)
    time_frame = models.CharField(max_length=1, choices=TimeFrame.choices, default=TimeFrame.DAY)
    # 24 hours clock
    start_time_hour = models.PositiveIntegerField(default=0)
    start_time_minutes = models.PositiveIntegerField(default=0)
    end_time_hour = models.PositiveIntegerField(default=1)
    end_time_minutes = models.PositiveIntegerField(default=0)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    effectiveness = models.IntegerField(default=0)
    description = models.TextField(default='')
    # Relational fields
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="habits")
    class Meta:
        ordering = ["-date_created"]
        constraints = [
            models.CheckConstraint(name="NON_VOID_HABIT_TIME_WINDOW",
                                   check=models.Q(end_time_hour__gt=models.F("start_time_hour"))
                                   & models.Q(end_time_hour__lte=24)
                                   & models.Q(end_time_minutes__lte=59)
                                   & models.Q(start_time_minutes__lte=59))]

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
