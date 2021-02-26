"""
"""
from .models import Habit, User, Trace
from .views import HabitViewSet
from .serializers import UserSerializer, HabitSerializer, TraceSerializer
from rest_framework import status
from rest_framework.test import APITestCase, URLPatternsTestCase, force_authenticate, APIClient
from django.urls import include, path, reverse
from django.utils import timezone
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
import io

class UserModelTest(APITestCase):
    """
    Class that extends APITestCase to test User class model 
    """
    @classmethod
    def setup_class(cls):
        """
        This methods prepares the overall state for all tests within the UserModelTest class 
        """
        # Common User
        User.objects.create(username='deleteme', password='please')
        User.objects.create(username='otherUser', password='iamwhoiam')
        # Admin User
        User.objects.create_superuser(username="admin", password="passwordAdmin")
        # print("TESTADMINUSER: " + str(testAdminUser.is_staff)) --> TRUE
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
        self.client.logout()
        pass

    def test_list_users(self):
        """
        UserModelTest method that tests ListModelMixin
        """
        # Requests 
        users_list_url = reverse('user-list')
        user_list_response = self.client.get(users_list_url, format='json')

        # Assertions
        self.assertEqual(user_list_response.status_code , status.HTTP_200_OK)
        self.assertEqual(user_list_response.json()["count"] , 3)

    def test_create_user(self):
        """
        UserModelTest method that tests CreateModelMixin
        """
        # Checking that permissions work correctly ( allow any for this view )
        self.client.logout()
        # Requests 
        create_user_url = reverse('user-list')
        new_user_data = {'username' : 'Ellie',
                'password' : '123'}
        create_user_response = self.client.post(create_user_url, new_user_data, format='json')

        # Assertions
        self.assertEqual(create_user_response.status_code , status.HTTP_201_CREATED)

    def test_delete_user(self):
        """
        UserModelTest method that tests DestroyModelMixin
        """
        # Data
        user = User.objects.get(username='deleteme')

        # Requests 
        delete_user_url = reverse('user-detail', kwargs={'pk': user.id})
        delete_user_response = self.client.delete(delete_user_url, format='json')

        # Assertions
        self.assertEqual(delete_user_response.status_code , status.HTTP_204_NO_CONTENT)

    def test_retrieve_user(self):
        """
        UserModelTest method that tests RetrieveModelMixin
        """
        # Data
        NONEXISTENT_USER_ID = User.objects.count() + 9
        user = User.objects.get(username='deleteme')

        # Requests
        user_url = reverse('user-detail', kwargs={'pk' : user.id})
        retrieve_user_response = self.client.get(user_url, format='json') 

        nonexisten_user_url = reverse('user-detail', kwargs={'pk' : NONEXISTENT_USER_ID})
        retrieve_nonexistent_user_response = self.client.get(nonexisten_user_url, format='json')

        # Assertions
        self.assertEqual(retrieve_user_response.status_code, status.HTTP_200_OK)
        self.assertEqual(retrieve_nonexistent_user_response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_reset_user_password(self):
        """
        """
        url = reverse('user-change_password', kwargs={'pk' : 1})
        print(url)



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
        testUser = User.objects.create(username='Ellie', password='123')
        # To test pagination on viewsets
        i = 0
        while i < HABIT_CREATION_LIMIT:
           Habit.objects.create(user=testUser, name="h" + str(i))
           i += 1

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
        self.client.logout()
        pass

    def test_list_habit(self):
        """
        HabitModelTest method that tests ListModelMixin
        Note: Trying to reverse the view url with page_query_param does not work
        """
        # Requests 
        list_url = reverse('habit-list')
        get_initial_list_response = self.client.get(list_url, format='json')

        next_list_url = get_initial_list_response.json()["next"]
        get_next_list_response = self.client.get(next_list_url, format='json')

        # Assertions
        self.assertEqual(get_initial_list_response.status_code , status.HTTP_200_OK)
        self.assertEqual(len(get_initial_list_response.json()["results"]) , 100)
            # Pagination test
        self.assertEqual(get_initial_list_response.json()["count"] , 200)
        self.assertNotEqual(get_initial_list_response.json()["previous"], get_next_list_response.json()["previous"])

    def test_delete_habit(self):
        """
        HabitModelTest method that tests DestroyModelMixin
        """
        # Data 
        habit = Habit.objects.all().first()

        # Request
        url = reverse('habit-detail', kwargs={'pk' : habit.id})
        delete_resource_response = self.client.delete(url, format='json')
        get_deleted_resource_response = self.client.get(url, format='json')

        # Assertions
        self.assertEqual(delete_resource_response.status_code , status.HTTP_204_NO_CONTENT)
        self.assertEqual(get_deleted_resource_response.status_code , status.HTTP_404_NOT_FOUND)

    def test_create_habit(self):
        """
        HabitModelTest method that tests CreateModelMixin
        """
        # Data 
        user = User.objects.get(username='Ellie')

        # Requests U.R.Ls
        url = reverse('habit-list')
        # Note: HyperlinkedModelSerializer requires a url to the related resource instead of its primary key
        user_url = reverse('user-detail', kwargs=({'pk' : user.id}))

        # Post Requests Data
        data = {"name": "Running",
                #"time": timezone.now().isoformat(),
                #"effectiveness": 0,
                "description": "Test description",
                "user": user_url}

        # Responses
        response = self.client.post(url, data, format='json')

        # Assertions
        self.assertEqual(response.status_code , status.HTTP_201_CREATED)
        self.assertEqual(Habit.objects.get(name="Running").name, "Running")

    def test_retrieve_habit(self):
        """
        HabitModelTest method that tests RetrieveModelMixin
        """
        # Data 
         # Constants
        THIS_ID_DOESNOT_EXIST = Habit.objects.count() + 9
         # DB Data 
        habit = Habit.objects.all().first()
        
        # Requests
        habit_url = reverse('habit-detail', kwargs={'pk' : habit.id})
        habit_get_response = self.client.get(habit_url, format='json')

        nonexistent_habit_url = reverse('habit-detail', kwargs={'pk' : THIS_ID_DOESNOT_EXIST})
        nonexistent_habit_get_response = self.client.get(nonexistent_habit_url, format='json')

        # Assertions
        self.assertEqual(habit_get_response.status_code, status.HTTP_200_OK) 
        self.assertEqual(nonexistent_habit_get_response.status_code, status.HTTP_404_NOT_FOUND) 

class TraceModelTest(APITestCase):
    """
    Trace Model C.R.U.D funcionality test
    """
    @classmethod
    def setup_class(cls):
        """
        Pre-test set of data. Valid for each and in between tests
        """
        testUser = User.objects.create(username="testUser", password="testPassword")
        testHabit = Habit.objects.create(name="testHabit", user=testUser)
        testTrace = Trace.objects.create(habit=testHabit)

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
        self.client.logout()
        pass

    def test_list_traces(self):
        """
        TraceModelTest method that tests ListModelMixin
        """
        # Data
            # Constants
        TRACES_CREATION_LIMIT = 200
            # Other
        testHabit = Habit.objects.get(name="testHabit")
        i = 0
        while i < TRACES_CREATION_LIMIT:
            Trace.objects.create(habit=testHabit)
            i += 1

        # Requests 
        traces_list_url = reverse('trace-list')
        get_list_response = self.client.get(traces_list_url, format='json')

        # Assertions
        self.assertEqual(get_list_response.status_code, status.HTTP_200_OK)
        self.assertEqual(get_list_response.json()["count"], 201)

    def test_retrieve_trace(self):
        """
        TraceModelTest method that tests RetrieveModelMixin
        """
        # Data
        trace_to_retrieve = Trace.objects.first()
        # Requests
        retrieve_trace_url = reverse('trace-detail', kwargs={'pk' : trace_to_retrieve.id})
        retrieve_trace_response = self.client.get(retrieve_trace_url, format='json')
        # Assertions
        self.assertEqual(retrieve_trace_response.status_code, status.HTTP_200_OK)

    def test_create_trace(self):
        """
        TraceModelTest method that tests CreateModelMixin
        """
        # Data
        testHabit = Habit.objects.first()
        data = { "habit" : reverse('habit-detail', kwargs={'pk' : testHabit.id}) }
        # Requests 
        create_trace_url = reverse('trace-list')
        create_trace_responce = self.client.post(create_trace_url, data, format='json')
        # Assertions
        self.assertEqual(create_trace_responce.status_code, status.HTTP_201_CREATED)

    def test_delete_trace(self):
        """
        TraceModelTest method that tests DestroyModelMixin
        """
        # Data
        testTrace = Trace.objects.first()
        # Requests 
        delete_trace_url = reverse('trace-detail', kwargs={'pk' : testTrace.id})
        delete_trace_response = self.client.delete(delete_trace_url, format='json')
        # Assertions
        self.assertEqual(delete_trace_response.status_code, status.HTTP_204_NO_CONTENT)
