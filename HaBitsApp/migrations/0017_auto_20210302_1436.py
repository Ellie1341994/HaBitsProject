# Generated by Django 3.1.6 on 2021-03-02 14:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('HaBitsApp', '0016_auto_20210302_1431'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='trace',
            options={'ordering': ['-date_created']},
        ),
        migrations.RenameField(
            model_name='trace',
            old_name='date',
            new_name='date_created',
        ),
    ]