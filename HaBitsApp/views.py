"""
"""
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import UserSerializer, TraceSerializer, HabitSerializer
from .models import Habit, Trace, User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from django.urls import reverse
from HaBitsApp import permissions as custom_permissions  
import re

class UserViewSet(viewsets.ModelViewSet):
    """
    viewset.ModelViewSet subclass with custom views and permissions such as:
    set_password
    get_permissions
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # from https://stackoverflow.com/questions/39353063/custom-permissions-on-viewset
    def get_permissions(self):
        """
        UserViewSet method that sets each action permission:
        Permission: AllowAny Action: create
        Permission: IsAuthenticated Actions: c_password
        Custom permission: IsAuthenticated own email information only Action: partial_update(PATCH method)
        Permission: IsAdminUser Action: Any other
        """
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        # Only allows the current logged in user to modify its email
        elif ( self.action == 'partial_update'
             and self.request.method == 'PATCH'
             and len(self.request.data) == 1
             and 'email' in self.request.data
             and str(self.request.user.id) in self.request.path
             or self.action == 'c_password'):
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.IsAdminUser]

        return super().get_permissions()

class HabitViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    permission_classes = [permissions.IsAdminUser]
    def get_permissions(self):
        """
        HabitViewSet method that sets each action permission:
        """
        def correctFields(data: dict) -> bool:
            """
            Determines if the post request data fields
            for the partial_update action are allowed to be modified or not
            """
            dataIs = False
            for field in data:
                if field in ['name', 'date_created', 'user']:
                    return False
                if field in ['date_edited',
                             'description',
                             'effectiveness'
                             'time_frame',
                             'day',
                             'start_hour',
                             'start_minutes',
                             'end_hour',
                             'end_minutes']:
                    dataIs = True

            return dataIs

        def checkHabitTime(habit_data: dict) -> bool:
            """
            Determines whether a habit's start hour is lower than its end hour
            """
            s = 'start_hour'
            e = 'end_hour'
            return s in habit_data and e in habit_data and habit_data[s] < habit_data[e]

        if ( self.action == 'create'
            and ("user/" + str(self.request.user.id) + "/") in self.request.data["user"]
            and checkHabitTime(self.request.data) ):
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'list' and self.request.user.id is not None:
            self.queryset = self.queryset.filter(user=self.request.user.id)
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'destroy':
            self.permission_classes = [custom_permissions.IsAuthor]
        elif self.action == 'partial_update' \
            and self.request.user.id is not None \
            and correctFields(self.request.data):
            self.queryset = self.queryset.filter(user=self.request.user.id)
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.IsAdminUser]

        return super().get_permissions()

class TraceViewSet(viewsets.ModelViewSet):
    """
    Subclass model that inherits viewsets.ModelViewSet from rest_framework module
    Brief: ModelViewSet adds default C.R.U.D actions to the model.
    """
    queryset = Trace.objects.all()
    serializer_class = TraceSerializer
    ordering_fields = '__all__'
    def get_permissions(self):
        """
        TraceViewSet method that sets each action permission:
        """

        if self.action == 'list' and self.request.user.id is not None:
            self.queryset = Trace.objects.filter(habit__user=self.request.user)
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create' and 'habit' in self.request.data:
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.IsAdminUser]

        return super().get_permissions()
