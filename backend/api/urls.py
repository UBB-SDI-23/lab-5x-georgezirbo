from django.urls import path
from .views import *
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns=[
    path('student/', StudentCreateList.as_view()),
    path('student/<int:pk>/', StudentDetail.as_view()),
    path('grade/', GradeCreateList.as_view()),
    path('grade/<int:pk>/', GradeDetail.as_view()),
    path('course/', CourseCreateList.as_view()),
    path('course/<int:pk>/', CourseDetail.as_view()),
    path('teacher/', TeacherCreateList.as_view()),
    path('teacher/<int:pk>/', TeacherDetail.as_view()),
    path('student/by-average/', StudentByAverage.as_view()),
    path('course/no-students/', CoursesNoStudents.as_view()),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/docs/', SpectacularSwaggerView().as_view(url_name='schema'))
]
