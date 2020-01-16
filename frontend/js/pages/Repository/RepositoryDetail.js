import React from 'react';
import { Grid, Header, Label, Icon, Breadcrumb, Segment } from 'semantic-ui-react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import AuthService from '../../services/AuthService';
import ContentService from '../../services/ContentService';
import GitHubService from '../../services/GitHubService';
import RepositoryService from '../../services/RepositoryService';
import LoadingDataTable from '../../components/LoadingTable';
import LoadingHeader from '../../components/LoadingHeader';

import ContentDataTable from './ContentDataTable';

import './style.scss';

class RepositoryDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repository: {},
      contents: [],
      readmeRaw: '',
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
        this.getRepositoryContents(res.data.pk);
        return res;
      })
      .catch((error) => {
        throw new Error(error.data);
      });
  }

  getRepositoryContents(repositoryId) {
    ContentService.fetchContents({ repository: repositoryId })
      .then((res) => {
        this.setState({ contents: res.data.results, isLoading: false }, this.getReadmeContentRaw);
        return res;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  getReadmeContentRaw() {
    const { repository } = this.state;

    GitHubService.fetchReadmeContentRaw(repository)
      .then((res) => {
        this.setState({ readmeRaw: res.data });
        return res;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  render() {
    if (!AuthService.isUserAuthenticated()) {
      return <Redirect to="/login" />;
    }

    const { repository, contents, isLoading, readmeRaw } = this.state;
    let activeTable;
    let activeHeader;

    if (isLoading) {
      activeTable = <LoadingDataTable totalColumns={4} totalRows={10} />;
      activeHeader = <LoadingHeader />;
    } else {
      activeTable = <ContentDataTable dataTableList={contents} />;
      activeHeader = (
        <Header as="h1" className="header-page">
          {repository.full_name}
          <Header.Subheader>{repository.description}</Header.Subheader>
        </Header>
      );
    }

    return (
      <Grid className="repository-detail">
        <Grid.Column>
          <div className="page-header">
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to="/repositories">Repositórios</Link>
              </Breadcrumb.Section>

              <Breadcrumb.Divider icon="right angle" />

              <Breadcrumb.Section>
                <Link to="/repositories">{repository.name}</Link>
              </Breadcrumb.Section>
            </Breadcrumb>

            {activeHeader}
          </div>

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

          <Grid.Row className="readme">
            <Header as="h5" attached="top">
              README.md
            </Header>

            <Segment attached placeholder>
              <ReactMarkdown source={readmeRaw} />
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(RepositoryDetail);
