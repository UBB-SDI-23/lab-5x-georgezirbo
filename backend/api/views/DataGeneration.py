import \
    csv
import \
    os
import \
    random
import time

from faker import \
    Faker
from rest_framework import \
    status
from rest_framework.response import \
    Response
from rest_framework.views import \
    APIView
from tqdm import \
    tqdm

from api.models import \
    User, \
    Profile, \
    Student, \
    Teacher, \
    Course, \
    Grade
from api.permissions import \
    IsAdmin


class GenerateStudents(APIView):
    permission_classes = [IsAdmin]
    def get(self, request, *args, **kwargs):
        n = int(request.GET.get('n'))
        faker = Faker(['en_AU', 'en_CA', 'en_US', 'es_AR', 'fr_FR', 'es_CO', 'es_ES', 'it_IT', 'de_DE'])
        try:
            cnps = list(Student.objects.values_list('cnp', flat=True))
            for i in tqdm(range(n)):
                fname = faker.first_name()
                lname = faker.last_name()
                email = fname.lower()+'.'+lname.lower()+'@stud.com'
                phone = '07' + str(random.randint(10_000_000, 99_999_999))

                #cnp
                sex = random.choice([1, 2, 5, 6])
                year = random.randint(0, 99)
                year = '0' + str(year) if year<10 else str(year)
                month = random.randint(1, 12)
                month = '0' + str(month) if month<10 else str(month)
                day = random.randint(1, 31)
                day = '0' + str(day) if day<10 else str(day)
                user_id = random.randint(0, 10_000)


                end = str(random.randint(0, 999_999)).zfill(6)
                cnp = str(sex) + str(year) + month + day + end
                while cnp in cnps:
                    end = str(random.randint(0, 999_999)).zfill(6)
                    cnp = str(sex) + str(year) + month + day + end
                cnps.append(cnp)

                Student.objects.create(fname=fname, lname=lname, cnp=cnp, email=email, phone=phone, user_id = user_id)
            return Response({"message": f"{n} students created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GenerateTeachers(APIView):
    permission_classes = [IsAdmin]
    def get(self, request, *args, **kwargs):
        n = int(request.GET.get('n'))
        faker = Faker(['en_AU', 'en_CA', 'en_US', 'es_AR', 'fr_FR', 'es_CO', 'es_ES', 'it_IT', 'de_DE'])
        try:
            cnps = list(Student.objects.values_list('cnp', flat=True))
            for i in tqdm(range(n)):
                fname = faker.first_name()
                lname = faker.last_name()
                rank = random.choice(['P', 'L', 'A'])
                descr = ' '.join(faker.words(100))
                user_id = random.randint(0, 10_000)
                Teacher.objects.create(fname=fname, lname=lname, rank=rank, descr=descr, user_id = user_id)
            return Response({"message": f"{n} teachers created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GenerateGrades(APIView):
    permission_classes = [IsAdmin]
    def get(self, request, *args, **kwargs):
        n = int(request.GET.get('n'))
        try:
            students = list(Student.objects.values_list('sid', flat=True))
            courses = list(Course.objects.values_list('cid', flat=True))
            student_course = list(zip(students, courses))
            for i in tqdm(range(n)):
                session = round(random.uniform(1.0, 10.0), 2)
                retake = random.choice([round(random.uniform(1.0, 10.0), 2), None])
                student = random.randint(1, 1_000_000)
                course = random.randint(1, 1_000_000)
                while (student, course) in student_course:
                    student = random.randint(1, 1_000_000)
                    course = random.randint(1, 1_000_000)
                    student_course.append((student, course))
                user_id = random.randint(0, 10_000)
                Grade.objects.create(course=Course.objects.get(cid=course), student=Student.objects.get(sid=student), session=session, retake=retake, user_id = user_id)
            return Response({"message": f"{n} grades created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GenerateCourses(APIView):
    permission_classes = [IsAdmin]
    def get(self, request, *args, **kwargs):
        n = int(request.GET.get('n'))

        universities=[]
        courses=[]
        faculties=[]
        departments=[]

        try:
            #populating options
            print(os.getcwd())
            with open(
                'api/data/university.csv', newline='') as csvfile:
                reader = csv.reader(csvfile)
                for row in reader:
                    universities.append(row[0])
            with open(
                    'api/data/course.csv', newline='') as csvfile:
                reader = csv.reader(csvfile)
                for row in reader:
                    courses.append(row[0])
            with open(
                    'api/data/faculty.csv', newline='') as csvfile:
                reader = csv.reader(csvfile)
                for row in reader:
                    faculties.append(row[0])
                    departments.append(row[1])


            for i in tqdm(range(n)):
                university = random.choice(universities)
                course = random.choice(courses)
                x = random.randint(0, len(faculties)-1)
                faculty = faculties[x]
                department = departments[x]
                teacher = random.randint(1, 1000_000)
                year = random.randint(2000, 2023)
                user_id = random.randint(1, 10_000)
                Course.objects.create(name=course, university=university, faculty=faculty, department=department, teacher=Teacher.objects.get(tid=teacher), year=year,user_id = user_id)
            return Response({"message": f"{n} courses created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GenerateUsers(APIView):
    permission_classes = [IsAdmin]
    def get(self, request, *args, **kwargs):
        n = int(request.GET.get('n'))
        fake = Faker(['en_AU', 'en_CA', 'en_US', 'es_AR', 'fr_FR', 'es_CO', 'es_ES', 'it_IT', 'de_DE'])
        fake_en = Faker(['en_AU', 'en_CA', 'en_US'])
        usernames = list(User.objects.values_list('username', flat=True))

        for _ in tqdm(range(n)):
            fname = fake.first_name()
            lname = fake.last_name()
            gender = random.choice(['M', 'F'])
            bio = ' '.join(fake_en.words(10))
            age = random.randint(1, 80)

            #create users
            username = ((fname + lname).lower() + str(random.randint(0,9))).replace(" ", "")
            while username in usernames:
                username = ((fname + lname).lower() + str(random.randint(0,9))).replace(" ", "")
            password = "Password2"
            user = User.objects.create_user(username=username, password=password, is_active=True)

            #create profile
            profile = Profile.objects.create(fname=fname, lname=lname, bio=bio, age=age, gender=gender, user=user)

        return Response({"message": f"{n} users created successfully"}, status=status.HTTP_201_CREATED)
