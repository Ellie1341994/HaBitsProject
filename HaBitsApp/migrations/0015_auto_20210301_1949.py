# Generated by Django 3.1.6 on 2021-03-01 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HaBitsApp', '0014_auto_20210227_1612'),
    ]

    operations = [
        migrations.RenameField(
            model_name='habit',
            old_name='range',
            new_name='time_frame',
        ),
        migrations.AlterField(
            model_name='habit',
            name='day',
            field=models.CharField(choices=[('MO', 'Monday'), ('TU', 'Tuesday'), ('WE', 'Wednesday'), ('TH', 'Thursday'), ('FR', 'Friday'), ('SU', 'Sunday'), ('SA', 'Saturday')], default='LU', max_length=2),
        ),
    ]
