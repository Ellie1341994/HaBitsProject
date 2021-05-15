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

    Attributes:
    username: string
    password: string
    email: string
    """
    class Meta:
        ordering = ["username"]

class Habit(models.Model):
    """
    Model that represents a user frequent activity

    Attributes:
    startTime: datetime
    endTime: datetime
    dateCreated: datetime
    dateEdited: datetime
    endTime: datetime
    description: string
    user: User model entry id as ForeignKey
    name: string <= 25 characters
    """
    # Non-relational fields
        # Mutable
    # 24 hours clock
    startTime = models.DateTimeField()
    endTime = models.DateTimeField()
    dateEdited = models.DateTimeField(auto_now=True)
    description = models.CharField(max_length=500, default='')
        # Inmutable
    name = models.CharField(max_length=25, unique=True)
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

    Attributes:
    dateCreated: datetime
    dateEdited: datetime
    state: string -> Status.DONE == 'D' | Status.PENDING == 'P' | Status.FAILED = 'F'
    effectiveness: positive integer <= 3
    note: string
    habit: HaBits Model entry id as ForeignKey
    """
    class Status(models.TextChoices):
        """
        Pseudo-Enumeration that defines a habit's point in time state
        """
        DONE = 'D', _('Done')
        PENDING = 'P', _('Pending')
        FAILED = 'F', _('Failed')

    # Non-relational fields
    dateCreated = models.DateTimeField(auto_now=False, default=timezone.now)
    state = models.CharField(max_length=1, choices=Status.choices, default=Status.PENDING)
    note = models.CharField(max_length=300,default='')
    effectiveness = models.IntegerField(default=0 , validators=[MinValueValidator(1), MaxValueValidator(3)])

    # Relational fields
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE, related_name="tracks")
    class Meta:
        ordering = ["-dateCreated"]
