import \
    random

from django.core.management import \
    BaseCommand
from faker import \
    Faker
from tqdm import \
    tqdm

from api.models import \
    User, \
    Profile

def generate_users(n):
    fake = Faker(['en_AU', 'en_CA', 'en_US', 'es_AR', 'fr_FR', 'es_CO', 'es_ES', 'it_IT', 'de_DE'])
    fake_en = Faker(['en_AU', 'en_CA', 'en_US'])
    usernames = []
    for _ in tqdm(range(n)):
        fname = fake.first_name()
        lname = fake.last_name()
        gender = random.choice(['M', 'F'])
        bio = ' '.join(fake_en.words(10))
        age = random.randint(1, 80)

        #create users
        username = (fname + lname).lower() + random.randint(0,9)
        while username in usernames:
            username = fake.user_name()
        usernames.append(username)
        password = "Password2"
        user = User.objects.create_user(username=username, password=password, is_active=True)
        user.save()

        #create profile
        profile = Profile.objects.create(fname=fname, lname=lname, bio=bio, age=age, gender=gender, user=user.id)
        profile.save()
