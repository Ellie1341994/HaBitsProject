"""
"""
from .models import Habit, User, Track
from .views import HabitViewSet, TrackViewSet
from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase, force_authenticate, APIClient
from django.urls import include, path, reverse
from django.utils import timezone
from django.db import IntegrityError, transaction
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from django.contrib.auth.hashers import make_password
from testfixtures import log_capture
from datetime import datetime
from random import random
from math import floor

#class UserModelTest(APITestCase):
#    """
#    Class that extends APITestCase to test User class model against their corresponding server views
#    """
#    @classmethod
#    def setup_class(cls):
#        """
#        This methods prepares the overall state for all tests within the UserModelTest class
#        """
#        # Common User
#        User.objects.create(username='deleteme', password=make_password('please'))
#        User.objects.create(username='otherUser', password=make_password('iamwhoiam'))
#        # Admin User
#        User.objects.create_superuser(username="admin", password="passwordAdmin")
#
#    @classmethod
#    def teardown_class(cls):
#        """
#        UserModelTest method that cleans all data used for and during the tests
#        """
#        User.objects.all().delete()
#
#    def setUp(self):
#        """
#        This methods prepares the state before each test method
#        """
#        # LogIn
#        # Note: Must use non-hashed account password to log in
#        self.client.login(username="admin", password="passwordAdmin")
#
#    def tearDown(self):
#        """
#        This methods refreshes the state after each test method
#        """
#        self.client.logout()
#        pass
#
#    def test_list_users(self):
#        """
#        UserModelTest method that tests ListModelMixin
#        """
#        # Requests
#        users_list_url = reverse('user-list')
#        user_list_response = self.client.get(users_list_url, format='json')
#
#        # Assertions
#        self.assertEqual(user_list_response.status_code , status.HTTP_200_OK)
#        self.assertEqual(user_list_response.json()["count"] , 3)
#
#    def test_create_user(self):
#        """
#        UserModelTest method that tests CreateModelMixin
#        """
#        # Checking that permissions work correctly ( allow any for this view )
#        self.client.logout()
#        # Requests
#        create_user_url = reverse('user-list')
#        new_user_data = {'username' : 'Ellie',
#                'password' : '123'}
#        create_user_response = self.client.post(create_user_url, new_user_data, format='json')
#
#        # Assertions
#        self.assertEqual(create_user_response.status_code , status.HTTP_201_CREATED)
#
#    def test_delete_user(self):
#        """
#        UserModelTest method that tests DestroyModelMixin
#        """
#        # Data
#        user = User.objects.get(username='deleteme')
#
#        # Requests
#        delete_user_url = reverse('user-detail', kwargs={'pk': user.id})
#        delete_user_response = self.client.delete(delete_user_url, format='json')
#
#        # Assertions
#        self.assertEqual(delete_user_response.status_code , status.HTTP_204_NO_CONTENT)
#
#    def test_retrieve_user(self):
#        """
#        UserModelTest method that tests RetrieveModelMixin
#        """
#        # Data
#        NONEXISTENT_USER_ID = User.objects.count() + 9
#        user = User.objects.get(username='deleteme')
#
#        # Requests
#        user_url = reverse('user-detail', kwargs={'pk' : user.id})
#        retrieve_user_response = self.client.get(user_url, format='json')
#
#        nonexisten_user_url = reverse('user-detail', kwargs={'pk' : NONEXISTENT_USER_ID})
#        retrieve_nonexistent_user_response = self.client.get(nonexisten_user_url, format='json')
#
#        # Assertions
#        self.assertEqual(retrieve_user_response.status_code, status.HTTP_200_OK)
#        self.assertEqual(retrieve_nonexistent_user_response.status_code, status.HTTP_404_NOT_FOUND)
#
#    def test_change_user_email(self):
#        """
#        UserModelTest method that tests UpdateModelMixin
#        """
#        # LogOut Admin to test IsAuthenticated permissions
#        self.client.logout()
#        # LogIn non-admin user
#        userLogIn = self.client.login(username='otherUser', password='iamwhoiam')
#        # print(userLogIn)
#
#        # Data
#        user = User.objects.get(username='otherUser')
#        new_user_data = {'email' : "a@b.com"}
#
#        # Requests
#        user_url = reverse('user-detail', kwargs={'pk' : user.id})
#        user_updated_response = self.client.patch(user_url, new_user_data, format='json')
#        response_data = user_updated_response.json()
#        #print(response_data)
#        user = User.objects.get(username='otherUser')
#        # Assertions
#        self.assertEqual(user_updated_response.status_code, status.HTTP_200_OK)
#        self.assertEqual(response_data["email"], 'a@b.com')
#

class HabitModelTest(APITestCase):
    """
    Class that extends APITestCase to test Habit class model
    """
    @classmethod
    def setup_class(cls):
        """
        Test data for all tests
        """
        # Data
        HABIT_CREATION_LIMIT = 200
        # Common Users
        testUser = User.objects.create(username='Ellie', password=make_password('123'))
        User.objects.create(username='otherUser', password=make_password('iamwhoiam'))
        # Admin User
        User.objects.create_superuser(username="admin", password="passwordAdmin")
        # To test pagination on viewsets
        i = 0
        while i < HABIT_CREATION_LIMIT:
           h = Habit.objects.create(user=testUser,
                                    name="h" + str(i),
                                    startTime=datetime(year=2021, month=4, day=1, hour=4),
                                    endTime=datetime(year=2021, month=4, day=1, hour=5),
                                    )
           h.save()
           i += 1

    @classmethod
    def teardown_class(cls):
        """
        """
        User.objects.all().delete()

    def setUp(self):
        """
        This methods prepares the state before each test method
        """
        # LogIn
        # Note: Must use non-hashed account password to log in
        isLoggedIn = self.client.login(username="admin", password="passwordAdmin")

    def tearDown(self):
        """
        This methods refreshes the state after each test method
        """
        pass

    def test_list_habit(self):
        """
        HabitModelTest method that tests the customized list action behaviour inherited from ListModelMixin
        Note: Trying to reverse the view url with page_query_param does not work
        """
        # General data for testing
        user = User.objects.get(username='Ellie')

        # LogOut admin
        self.client.logout()

        # Common user logs in
        self.assertTrue(self.client.login(username='Ellie', password='123'))

        # Requests
        # User asks for their habits and the view correctly returns a page of them
        user_habit_list_url = reverse('habit-list')
        get_list_response = self.client.get(user_habit_list_url, format='json')
        self.assertEqual(get_list_response.status_code , status.HTTP_200_OK)
        get_list_response_data = get_list_response.json()
        #print(get_list_response_data)
        self.assertEqual(len(get_list_response.json()["results"]) , 100)
        user_habit_list = get_list_response_data["results"]
        user_url = reverse('user-detail', kwargs={'pk': user.id})
        for habit in user_habit_list:
            self.assertTrue(user_url in habit["user"])

        # Pagination test ( user habits' next page )
        next_list_url = get_list_response.json()["next"]
        get_next_list_response = self.client.get(next_list_url, format='json')
        self.assertEqual(get_list_response.json()["count"] , 200)
        self.assertNotEqual(get_list_response.json()["previous"], get_next_list_response.json()["previous"])
        self.assertTrue(get_list_response.data["previous"] is None)
        self.assertTrue(get_next_list_response.data["next"] is None)

        # Anonymous user attempt to see habits is correctly prohibited
        self.client.logout()
        get_anonym_list_response = self.client.get(user_habit_list_url, format='json')
        self.assertEqual(get_anonym_list_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_habit(self):
        """
        HabitModelTest method that tests the customized create action behaviour inherited from CreateModelMixin
        """
        # LogOut admin
        self.client.logout()
        # LogIn common user should succeed
        self.assertTrue(self.client.login(username='otherUser', password='iamwhoiam'))

        # General data for testing
        other_user = User.objects.get(username='admin')
        user = User.objects.get(username='otherUser')

        # Requests
        # User correctly creates a habit record for himself
        # Note: HyperlinkedModelSerializer requires a url to the related resource instead of its primary key
        user_url = reverse('user-detail', kwargs=({'pk' : user.id}))
        habit_data = {"name": "Running",
                      "description": "Test description",
                      "startTime": '2021-04-26T15:35:22.297Z',
                      "endTime": '2021-04-26T15:45:22.297Z',
                      "user": user_url}
        create_habit_url = reverse('habit-list')
        create_habit_response = self.client.post(create_habit_url, habit_data, format='json')
        self.assertEqual(create_habit_response.status_code, status.HTTP_201_CREATED)
        #print(create_habit_response.json())

        # User attempt to create a habit for another user is forbidden
        wrong_user_url = reverse('user-detail', kwargs=({'pk' : other_user.id}))
        wrong_habit_data = {"name": "Smoking",
                      "startTime": '2021-04-26T15:35:22.297Z',
                      "endTime": '2021-04-26T15:45:22.297Z',
                            "description": "Test description",
                            "user": wrong_user_url}
        wrong_create_habit_response = self.client.post(create_habit_url, wrong_habit_data, format='json')
        #print(wrong_create_habit_response.json())
        self.assertEqual(wrong_create_habit_response.status_code, status.HTTP_403_FORBIDDEN)

        # User attempt to create a habit with wrong start and end hours is forbidden
        wrong_habit_data_0 = {"name" : "wrong habit",
                              "description" : "this habit's time is wrong",
                              "startTime": '2021-04-26T16:35:22.297Z',
                              "endTime": '2021-04-26T15:45:22.297Z',
                              "user" : user_url}
        #try:
        #    # https://stackoverflow.com/questions/21458387/transactionmanagementerror-you-cant-execute-queries-until-the-end-of-the-atom
        #    with transaction.atomic():
        #      self.client.post(create_habit_url, wrong_habit_data_0, format='json')
        #      self.fail("habitStartTimeBelowEndTime constraint not enforced")
        #except IntegrityError as DBConstraintError:
        #    pass
        #NOTE: Code above is below's "equivalent" but I think it's better practice to handle the exception as an assertion test
        # instead of actual exception
        with transaction.atomic():
            self.assertRaises(IntegrityError, self.client.post, create_habit_url, wrong_habit_data_0, format='json')

        #self.assertRaises(IntegrityError)

        # Anonymous user attempt to create a habit correctly identifyies him as non-authenticated
        self.client.logout()
        create_habit_anonym_response = self.client.post(create_habit_url, habit_data, format='json')
        self.assertEqual(create_habit_anonym_response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_retrieve_habit(self):
        """
        HabitModelTest method that tests RetrieveModelMixin
        """
        self.client.logout()
        # LogIn common user should succeed
        self.assertTrue(self.client.login(username='Ellie', password='123'))
        # Data
         # Constants
        ObjCount = Habit.objects.count()
        THIS_ID_DOESNOT_EXIST = ObjCount + 9
         # DB Data
        habit = Habit.objects.filter(user__username='Ellie').first()
        print(habit)

        # Requests
        nonexistent_habit_url = reverse('habit-detail', kwargs={'pk' : THIS_ID_DOESNOT_EXIST})
        nonexistent_habit_get_response = self.client.get(nonexistent_habit_url, format='json')
        self.assertEqual(nonexistent_habit_get_response.status_code, status.HTTP_404_NOT_FOUND)

        habit_url = reverse('habit-detail', kwargs={'pk' : habit.id})
        habit_get_response = self.client.get(habit_url, format='json')
        self.assertEqual(habit_get_response.status_code, status.HTTP_200_OK)


    def test_partial_update_habit(self):
        """
        HabitModelTest method that tests the customized partial_update action behaviour inherited from UpdateModelMixin
        """
        # LogOut admin
        self.client.logout()
        # LogIn common user should succeed
        self.assertTrue(self.client.login(username='Ellie', password='123'))

        # General data
        anElliesHabit = Habit.objects.filter(user__username='Ellie').first()

        # User attempt to modify one of its habits name correctly fail
        data = {'name' : 'somethingElse', 'endTime' : datetime.now()}
        update_habit_url = reverse('habit-detail', kwargs={'pk' : anElliesHabit.id})
        wrong_update_habit_request = self.client.patch(update_habit_url, data, format='json')
        self.assertEqual(wrong_update_habit_request.status_code, status.HTTP_403_FORBIDDEN)
        # Not logged attempt to modify a habit should be unuthorized
        self.client.logout()
        update_habit_request = self.client.patch(update_habit_url, data, format='json')
        self.assertEqual(update_habit_request.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_delete_habit(self):
        """
        HabitModelTest method that tests the customized destroy action behaviour inherited from DestroyModelMixin
        """
        # LogOut admin
        self.client.logout()

        # Common user logs in
        self.assertTrue(self.client.login(username='Ellie', password='123'))

        # General data for testing
        user = User.objects.get(username='Ellie')
        adminUser = User.objects.get(username='admin')

        anAdminHabit = Habit.objects.create(name="smoking",
                                            user=adminUser,
                                    startTime=datetime(year=2021, month=4, day=1, hour=4),
                                    endTime=datetime(year=2021, month=4, day=1, hour=5),
                                            )
        aUserHabit = Habit.objects.filter(user=user).first()

        # Requests
        # User attempt to delete its habit succeeds
        delete_habit_url = reverse('habit-detail', kwargs={'pk' : aUserHabit.id})
        delete_resource_response = self.client.delete(delete_habit_url, format='json')
        self.assertEqual(delete_resource_response.status_code , status.HTTP_204_NO_CONTENT)
        # User attempt to delete a habit that is not his own correctly informs that such request is forbidden

        admin_habit_url = reverse('habit-detail', kwargs={'pk' : anAdminHabit.id})
        delete_admin_habit_response = self.client.delete(admin_habit_url, format='json')
        self.assertEqual(delete_admin_habit_response.status_code , status.HTTP_403_FORBIDDEN)

        # Anonymous user attempt to delete a habit correctly identifyies him as non-authenticated
        self.client.logout()
        delete_habit_anonym_response = self.client.delete(admin_habit_url, format='json')
        self.assertEqual(delete_habit_anonym_response.status_code, status.HTTP_401_UNAUTHORIZED)


class TrackModelTest(APITestCase):
    """
    Track Model C.R.U.D funcionality test
    """
    @classmethod
    def setup_class(cls):
        """
        Pre-test set of data. Valid for each and in between tests
        """
        # Data
        TRACE_CREATION_LIMIT = 200
        # Common Users
        user_ellie = User.objects.create(username='Ellie', password=make_password('123'))
        ellie_habit = Habit.objects.create(user=user_ellie,
                                           name="videogaming",
                                    startTime=datetime(year=2021, month=4, day=1, hour=4),
                                    endTime=datetime(year=2021, month=4, day=1, hour=5),
                                           )
        other_user = User.objects.create(username='otherUser', password=make_password('iamwhoiam'))
        other_user_habit = Habit.objects.create(user=other_user,
                                                name="walking",
                                    startTime=datetime(year=2021, month=4, day=1, hour=4),
                                    endTime=datetime(year=2021, month=4, day=1, hour=5),
                                                )
        Track.objects.create(habit=other_user_habit)
        # Admin User
        User.objects.create_superuser(username="admin", password="passwordAdmin")
        # To test pagination on viewsets
        i = 0
        while i < TRACE_CREATION_LIMIT:
           t = Track.objects.create(habit=ellie_habit, state='D' if i % 2 == 0 else 'F')
           #if i < 10:
               #print(t.date_created)
           t.save()
           i += 1

    @classmethod
    def teardown_class(cls):
        """
        """
        User.objects.all().delete()

    def setUp(self):
        """
        This methods prepares the state before each test method
        """
        # LogIn
        # Note: Must use non-hashed account password to log in
        #isLoggedIn = self.client.login(username="admin", password="passwordAdmin")

    def tearDown(self):
        """
        This methods refreshes the state after each test method
        """

    def test_list_tracks(self):
        """
        TrackModelTest method that tests ListModelMixin
        """
        # General Data
        user_ellie = User.objects.get(username='Ellie')
        ellie_habit = Habit.objects.filter(user=user_ellie).first()
        #Log user in should succeed
        self.assertTrue(self.client.login(username='Ellie', password='123'))

        # User attempt to check habit tracks history should succeed
        track_list_url = reverse('track-list')
        track_list_request = self.client.get(track_list_url, format='json')
        track_list = track_list_request.json()
        first_track = track_list["results"][0]
        #print(track_list["results"])
        self.assertEqual(track_list_request.status_code, status.HTTP_200_OK)
        # Total tracks should be 201
        self.assertEqual(Track.objects.count(), 201)
        # Total habit's tracks should be 200
        self.assertEqual(track_list["count"], 200)
        # check that every track has the same habit url
        for track in track_list["results"]:
            self.assertEqual(track["habit"], first_track["habit"])
        # check that non logged in user is unauthorized
        self.client.logout()
        track_list_request = self.client.get(track_list_url, format='json')
        self.assertEqual(track_list_request.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_getHabitTrack(self):
        """
        Test that tracks from a specific habit given by the response are all of which their
        state is 'D'
        """
        # General Data
        user_ellie = User.objects.get(username='Ellie')
        ellie_habit = Habit.objects.filter(user=user_ellie).first()
        #Log user in should succeed
        self.assertTrue(self.client.login(username='Ellie', password='123'))

        getHabitTracks_url = reverse('track-getHabitTracks', kwargs={'pk' : ellie_habit.id})
        request = self.client.get(getHabitTracks_url, format='json')
        data = request.json()
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        tracks = data["results"]
        for track in tracks:
            self.assertTrue(track["state"] == "D")

    def test_retrieve_track(self):
        """
        TrackModelTest method that tests RetrieveModelMixin
        """
    def test_create_track(self):
        """
        TrackModelTest method that tests CreateModelMixin
        """
    def test_delete_track(self):
        """
        TrackModelTest method that tests DestroyModelMixin
        """
