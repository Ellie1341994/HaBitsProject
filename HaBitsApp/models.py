"""
HaBits DB Models
"""
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.core.validators import MaxValueValidator, MinValueValidator
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
        Method/s:
        Today():
        """
        MONDAY = 'MO', _('Monday')
        TUESDAY = 'TU', _('Tuesday')
        WEDNESDAY = 'WE', _('Wednesday')
        THURSDAY = 'TH', _('Thursday')
        FRIDAY = 'FR', _('Friday')
        SUNDAY = 'SU', _('Sunday')
        SATURDAY = 'SA', _('Saturday')

    def today():
        """
        DayNames method
        Determines the correct enumeration value
        for today
        """
        return date.today().strftime("%A").upper()[:2]

    # Non-relational fields
        # Mutable
    time_frame = models.CharField(max_length=1, choices=TimeFrame.choices, default=TimeFrame.DAY)
    day = models.CharField(max_length=2,choices=DayNames.choices, default=today)
    # 24 hours clock
    start_hour = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(23)])
    start_minutes = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(59)])
    end_hour = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(23)])
    end_minutes = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(59)])
    date_edited = models.DateTimeField(auto_now=True)
    effectiveness = models.IntegerField(default=0 , validators=[MinValueValidator(0), MaxValueValidator(10)])
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
                                   check=models.Q(end_hour__gt=models.F("start_hour")))]

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
    date_created = models.DateTimeField(auto_now=True)
    state = models.CharField(max_length=1, choices=Status.choices, default=Status.PENDING)
    note = models.TextField(default='')

    # Relational fields
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="traces")
    class Meta:
        ordering = ["-date_created"]
