import React from 'react';
import { Grid, Header, Label, Icon } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';

import SideMenu from 'components/SideMenu';

import AuthService from '../../services/AuthService';
import CommitService from '../../services/CommitService';
import RepositoryService from '../../services/RepositoryService';

import DataTable from './DataTable';

import './style.scss';

class RepositoryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repository: {},
      commits: [],
    };
  }

  componentDidMount() {
    const { repositoryId } = this.props.match.params;

    this.getRepository(repositoryId);
  }

  getRepository(repositoryId) {
    RepositoryService.fetchRepository(repositoryId)
      .then((res) => {
        this.setState({ repository: res.data });
        this.getRepositoryCommits(res.data.pk);
        return res;
      })
      .catch((error) => {
        alert(error.data);
      });
  }

  getRepositoryCommits(repositoryId) {
    CommitService.fetchCommits({ repository: repositoryId })
      .then((res) => {
        this.setState({ commits: res.data });
        return res;
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    if (!AuthService.isUserAuthenticated()) {
      return <Redirect to="/login" />;
    }

    const { repository, commits } = this.state;

    return (
      <Grid className="home" relaxed="very">
        <Grid.Column width={4}>
          <SideMenu />
        </Grid.Column>

        <Grid.Column className="clear-left-padding" width={12}>
          <Grid centered>
            <Grid.Column width={15}>
              <Header as="h1" className="header-page">
                Repositório: {repository.name}
                <Header.Subheader>{repository.description}</Header.Subheader>
              </Header>

              <Grid.Row className="container-utils">
                <Label>
                  <Icon name="flag" /> {repository.language}
                </Label>
                <Label>
                  <Icon name="star" /> {repository.stargazers_count}
                </Label>
                <Label>
                  <Icon name="copy" /> {repository.clone_url}
                </Label>
              </Grid.Row>

              <Grid.Row>
                <DataTable dataTableList={commits} />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(RepositoryDetail);
