import React from 'react';
import { Grid, Header } from 'semantic-ui-react';

import RepositoryService from '../../services/RepositoryService';
import SideMenu from '../../components/SideMenu';

import RepositoryDataTable from './RepositoryDataTable';

class RepositoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repositories: [],
    };
  }

  componentDidMount() {
    this.getRepositories();
  }

  getRepositories() {
    RepositoryService.fetchRepositories()
      .then((res) => {
        this.setState({ repositories: res.data });
        return res;
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { repositories } = this.state;

    return (
      <Grid className="home" relaxed="very">
        <Grid.Column width={4}>
          <SideMenu />
        </Grid.Column>

        <Grid.Column className="clear-left-padding" width={12}>
          <Grid centered>
            <Grid.Column width={15}>
              <Header as="h1" className="header-page" dividing>
                Repositórios
              </Header>

              <Grid.Row className="container-utils">
                <div>Seus repositórios</div>
              </Grid.Row>

              <Grid.Row>
                <RepositoryDataTable repositories={repositories} />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default RepositoryList;
