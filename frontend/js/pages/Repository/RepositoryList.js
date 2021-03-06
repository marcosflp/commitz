import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Pagination, Breadcrumb } from 'semantic-ui-react';

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
    let pagination;

    if (isLoadingRepositories) {
      activeTable = <LoadingDataTable totalColumns={4} totalRows={10} />;
    } else {
      activeTable = <RepositoryDataTable repositories={repositories} />;
      pagination = (
        <Pagination
          activePage={activePage}
          nextItem={false}
          prevItem={false}
          totalPages={totalPages}
          onPageChange={this.handlePaginationChange}
        />
      );
    }

    return (
      <Grid>
        <Grid.Column>
          <div className="page-header">
            <Breadcrumb>
              <Breadcrumb.Section>
                <Link to="/repositories">Repositórios</Link>
              </Breadcrumb.Section>
            </Breadcrumb>

            <Header as="h1" className="header-page" dividing>
              Repositórios
            </Header>
          </div>

          <Grid.Row className="container-utils">
            <div>Seus repositórios</div>
          </Grid.Row>

          <Grid.Row>{activeTable}</Grid.Row>

          <Grid.Row className="pagination">{pagination}</Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default RepositoryList;
