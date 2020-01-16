# Generated by Django 2.2.9 on 2020-01-16 17:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_content_repository'),
    ]

    operations = [
        migrations.AlterField(
            model_name='content',
            name='sha',
            field=models.CharField(max_length=64),
        ),
        migrations.AlterUniqueTogether(
            name='content',
            unique_together={('repository', 'sha')},
        ),
    ]