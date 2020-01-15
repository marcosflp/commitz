import React from 'react';
import { Grid, Header, Dropdown, Icon, Pagination } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import CommitService from '../../services/CommitService';
import RepositoryService from '../../services/RepositoryService';
import LoadingDataTable from '../../components/LoadingTable';

import CommitDataTable from './CommitDataTable';

import './style.scss';

class CommitList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      totalPages: 1,
      dataTableCommits: [],
      isLoadingDataTableCommits: true,
      repositoryDropdownOptions: [],
      repositoryDropdownValue: null,
      repositoryFilteredID: null,
    };

    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.updateDataTableList = this.updateDataTableList.bind(this);
    this.handleRepositoryFilter = this.handleRepositoryFilter.bind(this);
    this.handleRepositoryDropDownValueChange = this.handleRepositoryDropDownValueChange.bind(this);
    this.handleRepositoryDropDownValueClear = this.handleRepositoryDropDownValueClear.bind(this);
  }

  componentDidMount() {
    this.updateDataTableList();
    this.getRepositoryDropdownOptions();
  }

  handlePaginationChange(e, value) {
    this.setState({ activePage: value.activePage }, this.updateDataTableList);
    window.scrollTo(0, 0);
  }

  handleRepositoryFilter(e) {
    const value = parseInt(e.target.id, 10);
    this.setState(
      { repositoryFilteredID: value, repositoryDropdownValue: value },
      this.updateDataTableList
    );
  }

  handleRepositoryDropDownValueChange(e, object) {
    this.setState(
      { repositoryFilteredID: object.value, repositoryDropdownValue: object.value, activePage: 1 },
      this.updateDataTableList
    );
  }

  handleRepositoryDropDownValueClear() {
    this.setState(
      { repositoryDropdownValue: null, repositoryFilteredID: null, activePage: 1 },
      this.updateDataTableList
    );
  }

  getRepositoryDropdownOptions() {
    RepositoryService.fetchRepositories().then((res) => {
      const options = res.data.results.map((repo) => {
        return { key: repo.pk, value: repo.pk, text: repo.full_name };
      });

      this.setState({ repositoryDropdownOptions: options });
      return res;
    });
  }

  updateDataTableList() {
    const { activePage, repositoryFilteredID } = this.state;
    const query = { page: activePage };

    this.setState({ isLoadingDataTableCommits: true });

    if (repositoryFilteredID !== null) {
      query.repository = repositoryFilteredID;
    }

    CommitService.fetchDataTable(query)
      .then((res) => {
        this.setState({
          dataTableCommits: res.data.results,
          totalPages: res.data.total_pages,
          isLoadingDataTableCommits: false,
        });
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

    const {
      activePage,
      totalPages,
      repositoryDropdownOptions,
      dataTableCommits,
      isLoadingDataTableCommits,
      repositoryDropdownValue,
    } = this.state;
    let activeTable;

    if (isLoadingDataTableCommits) {
      activeTable = <LoadingDataTable totalColumns={4} totalRows={10} />;
    } else {
      activeTable = <CommitDataTable dataTableCommits={dataTableCommits} />;
    }

    return (
      <Grid>
        <Grid.Column>
          <Header as="h1" className="header-page" dividing>
            Commits
          </Header>

          <Grid.Row className="container-utils">
            <div className="select-repository">
              <Dropdown
                options={repositoryDropdownOptions}
                placeholder="Repositórios"
                search
                selection
                value={repositoryDropdownValue}
                onChange={this.handleRepositoryDropDownValueChange}
              />
              <Icon
                className="close-icon"
                link
                name="close"
                size="small"
                onClick={this.handleRepositoryDropDownValueClear}
              />
            </div>
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

export default CommitList;
