# Generated by Django 4.1.7 on 2023-05-07 20:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_course_user_alter_grade_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='course_users', to='api.user'),
        ),
        migrations.AlterField(
            model_name='grade',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='grade_users', to='api.user'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='profile_users', to='api.user'),
        ),
        migrations.AlterField(
            model_name='student',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='student_users', to='api.user'),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='user',
            field=models.ForeignKey(db_column='user_id', on_delete=django.db.models.deletion.CASCADE, related_name='teacher_users', to='api.user'),
        ),
    ]
