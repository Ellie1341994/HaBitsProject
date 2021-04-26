"""
Classes that serialize and deserialize the app data into representations
like json
"""
from rest_framework import serializers
from HaBitsApp.models import Habit, Track, User



class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    """
    habits  = serializers.HyperlinkedRelatedField(many=True, view_name='habit-detail', read_only=True)
    #habits_listing = serializers.HyperlinkedIdentityField(view_name='track-list')

    class Meta:
        model = User
        fields = ['url','id','username','email', 'habits', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class HabitSerializer(serializers.HyperlinkedModelSerializer):
    """
    """
    tracks = serializers.HyperlinkedRelatedField(many=True, view_name='track-detail', read_only=True)
    #traces_listing = serializers.HyperlinkedIdentityField(view_name='trace-list')

    class Meta:
        model = Habit
        fields = '__all__'

class TrackSerializer(serializers.HyperlinkedModelSerializer):
    """
    """
    class Meta:
        model = Track
        fields = '__all__'
        read_ony_fields = fields
