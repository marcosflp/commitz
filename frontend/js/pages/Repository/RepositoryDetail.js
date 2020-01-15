import React from 'react';
import { Grid, Header, Label, Icon } from 'semantic-ui-react';
import { Redirect, withRouter } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import CommitService from '../../services/CommitService';
import RepositoryService from '../../services/RepositoryService';
import LoadingDataTable from '../../components/LoadingTable';

import DataTable from './DataTable';

import './style.scss';

class RepositoryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repository: {},
      commits: [],
      isLoading: true,
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
        throw new Error(error.data);
      });
  }

  getRepositoryCommits(repositoryId) {
    CommitService.fetchCommits({ repository: repositoryId })
      .then((res) => {
        this.setState({ commits: res.data.results, isLoading: false });
        return res;
      })
      .catch((error) => {
        throw new Error(error.data);
      });
  }

  render() {
    if (!AuthService.isUserAuthenticated()) {
      return <Redirect to="/login" />;
    }

    const { repository, commits, isLoading } = this.state;
    let activeTable;

    if (isLoading) {
      activeTable = <LoadingDataTable totalColumns={4} totalRows={10} />;
    } else {
      activeTable = <DataTable dataTableList={commits} />;
    }

    return (
      <Grid>
        <Grid.Column>
          <Header as="h1" className="header-page">
            {repository.full_name}
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

          <Grid.Row>{activeTable}</Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(RepositoryDetail);
