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
        HabitViewSet method that sets each action permission:
        """
        def correctFields(data):
            """
            Determines if the given fields storaged on the request data
            are allowed to be modified
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

        def habitOwnerIsUSer(request_user, request_path):
            """
            Determines whether the habit object was
            created by the current logged in user or not
            """
            habitIdPattern = re.compile('/\\d+/') 
            match = habitIdPattern.search(request_path)
            if match:
                habitId = int(match.group().strip('/'))
                habitObj = Habit.objects.get(id=habitId)
                return habitObj.user == request_user

        if self.action == 'create' \
           and ("user/" + str(self.request.user.id) + "/") in self.request.data["user"]: 
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'list' and self.request.user.id is not None:
            self.queryset = self.queryset.filter(user=self.request.user.id)
            self.permission_classes = [permissions.IsAuthenticated]
        elif self.action == 'destroy' and habitOwnerIsUSer(self.request.user, self.request.path):
            self.permission_classes = [permissions.IsAuthenticated]
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
