from django.db.models import Manager


class CommitManager(Manager):
    def commits_for_list(self):
        return self.select_related(
            'repository'
        ).all().order_by(
            '-authored_date'
        )
