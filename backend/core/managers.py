from django.db.models import Manager


class CommitManager(Manager):
    def commits_for_list(self):
        return self.select_related(
            'author',
            'author__githubprofile',
            'repository'
        ).all(

        ).order_by(
            '-authored_date'
        )
