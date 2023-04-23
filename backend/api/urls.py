from django.urls import path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from .views.CourseAutocomplete import \
    CourseAutocomplete
from .views.StudentAutocomplete import \
    StudentAutocomplete
from .views.TeacherAutocomplete import \
    TeacherAutocomplete
from .views.CourseCreateList import \
    CourseCreateList
from .views.CourseDetail import \
    CourseDetail
from .views.CourseNoStudents import \
    CoursesNoStudents
from .views.GradeCreateList import \
    GradeCreateList
from .views.GradeDetail import \
    GradeDetail
from .views.StudentByAverage import \
    StudentByAverage
from .views.StudentCreateList import \
    StudentCreateList
from .views.StudentDetail import \
    StudentDetail
from .views.TeacherCreateList import \
    TeacherCreateList
from .views.TeacherDetail import \
    TeacherDetail

urlpatterns=[
    path('student/', StudentCreateList.as_view()),
    path('student/<int:pk>/', StudentDetail.as_view()),
    path('student/autocomplete/', StudentAutocomplete.as_view()),
    path('grade/', GradeCreateList.as_view()),
    path('grade/<int:pk>/', GradeDetail.as_view()),
    path('course/', CourseCreateList.as_view()),
    path('course/<int:pk>/', CourseDetail.as_view()),
    path('course/autocomplete/', CourseAutocomplete.as_view()),
    path('teacher/', TeacherCreateList.as_view()),
    path('teacher/<int:pk>/', TeacherDetail.as_view()),
    path('teacher/autocomplete/', TeacherAutocomplete.as_view()),
    path('student/by-average/', StudentByAverage.as_view()),
    path('course/by-no-students/', CoursesNoStudents.as_view()),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('schema/docs/', SpectacularSwaggerView().as_view(url_name='schema'))
]
