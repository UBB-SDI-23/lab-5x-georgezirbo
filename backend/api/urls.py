from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import \
    TokenRefreshView, \
    TokenVerifyView

from .views.Course import \
    CourseAutocompleteView
from .views.DataGeneration import \
    GenerateUsers, \
    GenerateStudents, \
    GenerateTeachers, \
    GenerateCourses, \
    GenerateGrades
from .views.Delete import \
    DeleteStudents, \
    DeleteCourses, \
    DeleteTeachers, \
    DeleteGrades
from .views.Grade import \
    GradeView, \
    GradeDetailView
from .views.Profile import \
    ProfileView, \
    ProfileDetailView
from .views.Register import \
    RegisterView, \
    RegisterConfirmationView
from .views.Settings import \
    DefaultPageSizeView
from .views.Student import \
    StudentAutocompleteView
from .views.Teacher import \
    TeacherAutocompleteView
from .views.Course import \
    CourseView, \
    CourseDetailView,\
    CoursesNoStudentsView
from .views.Teacher import \
    TeacherView,\
    TeacherDetailView
from .views.Student import \
    StudentDetailView, \
    StudentView,\
    StudentByAverageView
from .views.Token import \
    MyTokenObtainPairView
from .views.User import \
    UserView, \
    UserDetailView

urlpatterns=[
    #student
    path('student/', StudentView.as_view()),
    path('student/<int:pk>/', StudentDetailView.as_view()),
    path('student/by-average/', StudentByAverageView.as_view()),
    path('student/autocomplete/', StudentAutocompleteView.as_view()),

    #grade
    path('grade/', GradeView.as_view()),
    path('grade/<int:pk>/', GradeDetailView.as_view()),

    #course
    path('course/', CourseView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/by-no-students/', CoursesNoStudentsView.as_view()),
    path('course/autocomplete/', CourseAutocompleteView.as_view()),

    #teacher
    path('teacher/', TeacherView.as_view()),
    path('teacher/<int:pk>/', TeacherDetailView.as_view()),
    path('teacher/autocomplete/', TeacherAutocompleteView.as_view()),

    #user
    path('user/', UserView.as_view()),
    path('user/<int:pk>/', UserDetailView.as_view()),

    #profile
    path('profile/', ProfileView.as_view()),
    path('profile/<str:username>/', ProfileDetailView.as_view()),

    #register
    path('register/', RegisterView.as_view()),
    path('register/confirm/', RegisterConfirmationView.as_view()),

    #token
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    #populate database
    path('generate/users/', GenerateUsers.as_view(), name='token_obtain_pair'),
    path('generate/students/', GenerateStudents.as_view()),
    path('generate/teachers/', GenerateTeachers.as_view()),
    path('generate/courses/', GenerateCourses.as_view()),
    path('generate/grades/', GenerateGrades.as_view()),

    #bulkdelete
    path('delete/students/', DeleteStudents.as_view()),
    path('delete/courses/', DeleteCourses.as_view()),
    path('delete/teachers/', DeleteTeachers.as_view()),
    path('delete/grades/', DeleteGrades.as_view()),

    #default page size
    path('settings/pagesize/', DefaultPageSizeView.as_view()),

    #schema
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/docs/', SpectacularSwaggerView().as_view(url_name='schema'))
]
