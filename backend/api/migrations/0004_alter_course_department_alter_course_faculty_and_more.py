# Generated by Django 4.1.7 on 2023-04-24 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_teacher_descr'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='department',
            field=models.CharField(max_length=256),
        ),
        migrations.AlterField(
            model_name='course',
            name='faculty',
            field=models.CharField(max_length=256),
        ),
        migrations.AlterField(
            model_name='course',
            name='university',
            field=models.CharField(max_length=256),
        ),
    ]
