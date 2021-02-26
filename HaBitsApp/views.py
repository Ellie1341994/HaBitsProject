"""
"""
from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import UserSerializer, TraceSerializer, HabitSerializer
from .models import Habit, Trace, User
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import action

class UserViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer 
    # from https://stackoverflow.com/questions/39353063/custom-permissions-on-viewset
    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [permissions.AllowAny]
        else:
            self.permission_classes = [permissions.IsAdminUser]

        return super().get_permissions()

    @action(methods=['post'], 
            detail=True,
            permission_classes=[permissions.IsAdminUser],
            url_path='change-password',
            url_name='change_password')
    def set_password(self, request, pk=None):
        pass

class HabitViewSet(viewsets.ModelViewSet):
    """
    Subclass model that inherits viewsets.ModelViewSet from rest_framework module
    Brief: ModelViewSet adds default C.R.U.D actions to the model.
    """
    queryset = Habit.objects.all()
    serializer_class = HabitSerializer 
    permission_classes = [permissions.IsAdminUser]

class TraceViewSet(viewsets.ModelViewSet):
    """
    Subclass model that inherits viewsets.ModelViewSet from rest_framework module
    Brief: ModelViewSet adds default C.R.U.D actions to the model.
    """
    queryset = Trace.objects.all()
    serializer_class = TraceSerializer
    ordering_fields = '__all__'
    permission_classes = [permissions.IsAdminUser]

