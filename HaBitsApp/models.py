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

class Habit(models.Model):
    """
    Model that registers a user's Habit information
    """
    # Non-relational fields
    name = models.CharField(max_length=25)
    time = models.DateTimeField(default=timezone.now)
    date_created = models.DateTimeField(auto_now_add=True)
    date_edited = models.DateTimeField(auto_now=True)
    effectiveness = models.IntegerField(default=0)
    description = models.TextField(default='')
    # Relational fields
    user = models.ForeignKey(User, on_delete=models.CASCADE)

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

    # Relational fields
    date = models.DateTimeField()
    state = models.CharField(max_length=1, choices=Status.choices, default=Status.PENDING)
    # Non-relational fields
    Value = models.ForeignKey(Habit, on_delete=models.CASCADE)
