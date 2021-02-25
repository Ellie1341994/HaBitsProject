"""
Classes that serialize and deserialize the app data into representations
like json
"""
from rest_framework import serializers
from HaBitsApp.models import Habit, Trace, User



class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    """
    habits  = serializers.HyperlinkedRelatedField(many=True, view_name='habit-detail', read_only=True)
    #habits_listing = serializers.HyperlinkedIdentityField(view_name='track-list')

    class Meta:
        model = User
        fields = ['url','id','username','email', 'habits']
        extra_kwargs = {'password': {'write_only': True}}

class HabitSerializer(serializers.HyperlinkedModelSerializer):
    """
    """
    traces = serializers.HyperlinkedRelatedField(many=True, view_name='trace-detail', read_only=True)
    #traces_listing = serializers.HyperlinkedIdentityField(view_name='trace-list')

    class Meta:
        model = Habit
        fields = ['traces', 'url', 'id', 'name', 'date_created', 'date_edited', 'effectiveness', 'description', 'user']

class TraceSerializer(serializers.HyperlinkedModelSerializer):
    """
    """
    class Meta:
        model = Trace
        fields = '__all__'
        read_ony_fields = fields
