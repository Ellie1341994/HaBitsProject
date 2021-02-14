"""
HaBits DB Models
"""
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

# Create your models here.
class User(AbstractUser):
    """
    Custom User Model
    """

class Habit(models.Model):
    """
    Model that register user's Habit basic information
    """
    # Non-relational fields
    name = models.CharField(max_length=25)
    time = models.DateTimeField()
    date_created = models.DateTimeField()
    date_created = models.DateTimeField()
    effectiveness = models.IntegerField()
    description = models.TextField(default='')
    # Relational fields
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Trace(models.Model):
    """
    Model that follows the user consistency of his Habits across time
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
