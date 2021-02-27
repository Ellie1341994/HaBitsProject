"""
"""
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import UserSerializer, TraceSerializer, HabitSerializer
from .models import Habit, Trace, User
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from django.urls import reverse
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
        Permission: IsAuthenticated Actions: set_password 
            partial_update(PATCH method) custom permission: email field only, own information only
        Permission: IsAdminUser Action: any others
        """
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        # Only allows the current logged in user to modify its email
        elif self.action == 'partial_update' \
             and self.request.method == 'PATCH' \
             and len(self.request.data) == 1 \
             and 'email' in self.request.data \
             and str(self.request.user.id) in self.request.path \
             or self.action == 'set_password':
            self.permission_classes = [permissions.IsAuthenticated]
        else:
            self.permission_classes = [permissions.IsAdminUser]

        return super().get_permissions()

    @action(methods=['post'],
            detail=True,
            permission_classes=[permissions.IsAuthenticated],
            url_path='change-password',
            url_name='change_password')
    def set_password(self, request, pk=None):
        """
        UserViewSet method that allows an authenticated users to change its password
        """
        user = self.get_object()
        serializer = UserSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            user.password = make_password(request.data["password"])
            user.save()
            return Response({}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HabitViewSet(viewsets.ModelViewSet):
    """
    Subclass model that inherits viewsets.ModelViewSet from rest_framework module
    Brief: ModelViewSet adds default C.R.U.D actions to the model.
    """
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer
    permission_classes = [permissions.IsAdminUser]
    def get_permissions(self):
        """
        HaitViewSet method that sets each action permission:
        """
        if self.action == 'create' \
           and ("user/" + str(self.request.user.id) + "/") in self.request.data["user"]: 
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'list' and self.request.user.id is not None:
            self.queryset = self.queryset.filter(user=self.request.user.id)
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'destroy':
            habitIdPattern = re.compile('/\\d+/') 
            match = habitIdPattern.search(self.request.path)
            if match:
                habitId = int(match.group().strip('/'))
                habitObj = Habit.objects.get(id=habitId)
                if habitObj.user == self.request.user:
                    self.permission_classes = [permissions.IsAuthenticated]
                else:
                    self.permission_classes = [permissions.IsAdminUser]
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
    permission_classes = [permissions.IsAdminUser]
