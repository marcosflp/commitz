from django.db.models import Manager


class CommitManager(Manager):
    def commits_for_list(self, user):
        return self.select_related(
            'repository',
            'author'
        ).filter(
            repository__user=user
        ).order_by(
            '-authored_date'
        )
