import React from 'react';
import { Grid, Header, Pagination } from 'semantic-ui-react';

import RepositoryService from '../../services/RepositoryService';
import LoadingDataTable from '../../components/LoadingTable';

import RepositoryDataTable from './RepositoryDataTable';

class RepositoryList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      totalPages: 1,
      repositories: [],
      isLoadingRepositories: true,
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
        this.setState({ repositories: res.data.results, isLoadingRepositories: false });
        return res;
      })
      .catch((error) => {
        throw new Error(error.data);
      });
  }

  render() {
    const { activePage, totalPages, repositories, isLoadingRepositories } = this.state;
    let activeTable;

    if (isLoadingRepositories) {
      activeTable = <LoadingDataTable totalColumns={4} totalRows={10} />;
    } else {
      activeTable = <RepositoryDataTable repositories={repositories} />;
    }

    return (
      <Grid>
        <Grid.Column>
          <Header as="h1" className="header-page" dividing>
            Repositórios
          </Header>

          <Grid.Row className="container-utils">
            <div>Seus repositórios</div>
          </Grid.Row>

          <Grid.Row>{activeTable}</Grid.Row>

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
