from django.db import models
from django.core.validators import *
from django.db.models import \
    Avg
from django.db.models.functions import \
    Round, \
    Greatest


class Student(models.Model):
    sid = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=100, verbose_name='First Name')
    lname = models.CharField(max_length=100, verbose_name='Last Name')
    cnp = models.CharField(max_length=13, unique=True, validators=[RegexValidator(r'[1256][0-9]{2}[0-1][0-9][0-3][0-9]\d{6}', message='Please introduce a valid CNP')], verbose_name='CNP')
    email = models.CharField(max_length=100, validators=[RegexValidator(r'[a-z]{2,10}\.[a-z]{2,10}@stud\.com', message='Please introduce a valid email')], blank=True, null=True, verbose_name='Email')
    phone = models.CharField(max_length=10, validators=[RegexValidator(r'07\d{8}', message='Please introduce a valid phone number')], blank=True, null=True, verbose_name='Phone')
    courses = models.ManyToManyField('Course', through='Grade', related_name='courses')

    class Meta:
        ordering=['sid']
        indexes=[models.Index(fields=['fname', 'lname']),]
                #models.Index(fields=['avg_grade'])]

    def __str__(self):
        return f"[{self.fname} {self.lname}]: {self.cnp}; {self.email}; {self.phone}"

class Grade(models.Model):
    gid = models.AutoField(primary_key=True)
    course = models.ForeignKey('Course', on_delete=models.CASCADE, verbose_name='Course', related_name='course_grades', db_column='course')
    student = models.ForeignKey('Student', on_delete=models.CASCADE, verbose_name='Student', related_name='student_grades', db_column='student')
    session = models.FloatField(verbose_name='Session Grade', validators=[MinValueValidator(1), MaxValueValidator(10)])
    retake = models.FloatField(verbose_name='Retake Grade', validators=[MinValueValidator(1), MaxValueValidator(10)], blank=True, null=True)

    class Meta:
        ordering=['gid']
        unique_together = ('course', 'student')
        indexes=[models.Index(fields=['course', 'student']),
                models.Index(fields=['session', 'retake'])]

    def __str__(self):
        return f"#{self.gid} ({self.course}, {self.student}): S: {self.session}; R: {self.retake}"

class Course(models.Model):
    cid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    university = models.CharField(max_length=256, null=False)
    faculty = models.CharField(max_length=256)
    department = models.CharField(max_length=256)
    teacher = models.ForeignKey('Teacher', on_delete=models.CASCADE, verbose_name='Teacher', related_name='teacher_courses', db_column='teacher')
    year = models.PositiveIntegerField(default=2023, validators=[MinValueValidator(2000), MaxValueValidator(2023)], verbose_name='Year')
    students = models.ManyToManyField('Student', through='Grade', related_name='students')

    def __str__(self):
        return f"\"{self.name}\" @ {self.university} - {self.faculty} {self.year}"

    class Meta:
        ordering=['cid']
        indexes=[models.Index(fields=['name'])]

class Teacher(models.Model):
    tid = models.AutoField(primary_key=True)
    fname = models.CharField(max_length=100, verbose_name="First Name")
    lname = models.CharField(max_length=100, verbose_name="Last Name")
    rank = models.CharField(max_length=1, verbose_name="Rank", choices=[('P', 'Professor'), ('A', 'Associate'), ('L', 'Lecturer')])
    descr = models.TextField(verbose_name="Description", null=False, blank=True, default='')

    def __str__(self):
        return f"{self.fname} {self.lname} [{self.rank}]"

    class Meta:
        ordering=['tid']
        indexes=[models.Index(fields=['fname', 'lname'])]

