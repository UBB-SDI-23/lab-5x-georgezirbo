from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework_simplejwt.views import \
    TokenRefreshView, \
    TokenVerifyView

from .views.Course import \
    CourseAutocompleteView
from .views.Grade import \
    GradeView, \
    GradeDetailView
from .views.Profile import \
    ProfileView, \
    ProfileDetailView
from .views.Register import \
    RegisterView, \
    RegisterConfirmationView
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
    UserDetailView, \
    GenerateUsers

urlpatterns=[
    path('student/', StudentView.as_view()),
    path('student/<int:pk>/', StudentDetailView.as_view()),
    path('student/by-average/', StudentByAverageView.as_view()),
    path('student/autocomplete/', StudentAutocompleteView.as_view()),
    path('grade/', GradeView.as_view()),
    path('grade/<int:pk>/', GradeDetailView.as_view()),
    path('course/', CourseView.as_view()),
    path('course/<int:pk>/', CourseDetailView.as_view()),
    path('course/by-no-students/', CoursesNoStudentsView.as_view()),
    path('course/autocomplete/', CourseAutocompleteView.as_view()),
    path('teacher/', TeacherView.as_view()),
    path('teacher/<int:pk>/', TeacherDetailView.as_view()),
    path('teacher/autocomplete/', TeacherAutocompleteView.as_view()),
    path('user/', UserView.as_view()),
    path('user/<int:pk>/', UserDetailView.as_view()),
    path('profile/', ProfileView.as_view()),
    path('profile/<str:username>/', ProfileDetailView.as_view()),
    path('register/', RegisterView.as_view()),
    path('register/confirm/', RegisterConfirmationView.as_view()),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('generate/', GenerateUsers.as_view(), name='token_obtain_pair'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/docs/', SpectacularSwaggerView().as_view(url_name='schema'))
]
