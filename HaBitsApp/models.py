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
    class Frequences(models.TextChoices):
        """
        Habit class's enumeration
        Defines time frames that describe how often a Habit is realized
        """
        DAILY = 'D', _('Daily')
        WEEKLY = 'W', _('Weekly')
        MONTHLY = 'M', _('Monthly')

    # Non-relational fields
        # Mutable
    frequency = models.CharField(max_length=1, choices=Frequences.choices, default=Frequences.DAILY)
    # 24 hours clock
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    dateEdited = models.DateTimeField(auto_now=True)
    effectiveness = models.IntegerField(default=0 , validators=[MinValueValidator(0), MaxValueValidator(10)])
    description = models.CharField(max_length=500,default='')
        # Inmutable
    name = models.CharField(max_length=25)
    dateCreated = models.DateTimeField(auto_now_add=True)
    # Relational fields
    # Inmutable
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="habits")
    class Meta:
        ordering = ["-dateCreated"]
        constraints = [
            models.CheckConstraint(name="habitStartTimeBelowEndTime",
                                   check=models.Q(startTime__lt=models.F("endTime")))]

class Track(models.Model):
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
    dateCreated = models.DateTimeField(auto_now=True)
    state = models.CharField(max_length=1, choices=Status.choices, default=Status.PENDING)
    note = models.CharField(max_length=300,default='')

    # Relational fields
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="tracks")
    class Meta:
        ordering = ["-dateCreated"]
