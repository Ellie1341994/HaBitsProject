"""
"""
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import UserSerializer, TrackSerializer, HabitSerializer
from .models import Habit, Track, User
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, authenticate
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from django.urls import reverse
from HaBitsApp import permissions as custom_permissions
from django.contrib import admin
from django.contrib.auth.decorators import login_required
import re

admin.site.login = login_required(admin.site.login)

class UserViewSet(viewsets.ModelViewSet):
    """
    viewset.ModelViewSet subclass with custom views and permissions such as:
    get_permissions
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # from https://stackoverflow.com/questions/39353063/custom-permissions-on-viewset
    def get_permissions(self):
        """
        UserViewSet method that sets each action permission:
        """
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        elif '/user/' in self.request.path:
            self.permission_classes = [permissions.AllowAny]
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
            for field in data:
                if ( field in ['name', 'dateEdited', 'effectiveness', 'dateCreated', 'user']
                    or field not in [ 'description',
                             'frequency',
                             'startTime',
                             'endTime' ]):
                    return False

            return True

        if ( self.action == 'create'
            and 'user' in self.request.data
            and ("user/" + str(self.request.user.id) + "/") in self.request.data["user"]):
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

class TrackViewSet(viewsets.ModelViewSet):
    """
    Subclass model that inherits viewsets.ModelViewSet from rest_framework module
    Brief: ModelViewSet adds default C.R.U.D actions to the model.
    """
    queryset = Track.objects.all()
    serializer_class = TrackSerializer
    ordering_fields = '__all__'
    def get_permissions(self):
        """
        TraceViewSet method that sets each action permission:
        """

        if self.action == 'list' and self.request.user.id is not None:
            self.queryset = Track.objects.filter(habit__user=self.request.user)
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'create' and 'habit' in self.request.data:
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.IsAdminUser]

        return super().get_permissions()
