from django.contrib import admin

# Register your models here.
from core.models import Commit, Repository


class CommitAdmin(admin.ModelAdmin):
    list_display = ('sha', 'repository', 'author')


class RepositoryAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'user')


admin.site.register(Commit, CommitAdmin)
admin.site.register(Repository, RepositoryAdmin)
