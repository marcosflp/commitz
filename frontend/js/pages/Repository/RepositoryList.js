import React from 'react';
import { Grid, Header, Pagination } from 'semantic-ui-react';

import RepositoryService from '../../services/RepositoryService';

import RepositoryDataTable from './RepositoryDataTable';

class RepositoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      totalPages: 1,
      repositories: [],
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  componentDidMount() {
    this.getRepositories();
  }

  handlePaginationChange(e, value) {
    this.setState({ activePage: value.activePage }, this.updateDataTableList);
    window.scrollTo(0, 0);
  }

  getRepositories() {
    RepositoryService.fetchRepositories()
      .then((res) => {
        this.setState({ repositories: res.data.results });
        return res;
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { activePage, totalPages, repositories } = this.state;

    return (
      <Grid>
        <Grid.Column>
          <Header as="h1" className="header-page" dividing>
            Repositórios
          </Header>

          <Grid.Row className="container-utils">
            <div>Seus repositórios</div>
          </Grid.Row>

          <Grid.Row>
            <RepositoryDataTable repositories={repositories} />
          </Grid.Row>

          <Grid.Row className="pagination">
            <Pagination
              activePage={activePage}
              nextItem={false}
              prevItem={false}
              totalPages={totalPages}
              onPageChange={this.handlePaginationChange}
            />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default RepositoryList;
