import React from 'react';
import { Grid, Header, Dropdown, Icon } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import SideMenu from 'components/SideMenu';

import AuthService from '../../services/AuthService';
import HomeService from '../../services/HomeService';
import RepositoryService from '../../services/RepositoryService';

import DataTable from './DataTable';

import './style.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTableList: [],
      repositoryDropdownOptions: [],
      repositoryDropdownValue: null,
      repositoryFilteredID: null,
    };

    this.updateDataTableList = this.updateDataTableList.bind(this);
    this.handleRepositoryFilter = this.handleRepositoryFilter.bind(this);
    this.handleRepositoryDropDownValueChange = this.handleRepositoryDropDownValueChange.bind(this);
    this.handleRepositoryDropDownValueClear = this.handleRepositoryDropDownValueClear.bind(this);
  }

  componentDidMount() {
    if (!AuthService.isUserAuthenticated()) {
      return null;
    }

    this.updateDataTableList();
    this.getRepositoryDropdownOptions();
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
      { repositoryFilteredID: object.value, repositoryDropdownValue: object.value },
      this.updateDataTableList
    );
  }

  handleRepositoryDropDownValueClear() {
    this.setState(
      { repositoryDropdownValue: null, repositoryFilteredID: null },
      this.updateDataTableList
    );
  }

  getRepositoryDropdownOptions() {
    RepositoryService.fetchRepositories().then((res) => {
      const options = res.data.map((repo) => {
        return { key: repo.pk, value: repo.pk, text: repo.full_name };
      });

      this.setState({ repositoryDropdownOptions: options });
      return res;
    });
  }

  updateDataTableList() {
    const { repositoryFilteredID } = this.state;
    let query = null;

    if (repositoryFilteredID !== null) {
      query = { repository: repositoryFilteredID };
    }

    HomeService.fetchDataTable(query)
      .then((res) => {
        this.setState({ dataTableList: res.data });
        return res;
      })
      .catch((error) => {
        alert(error.data);
      });
  }

  render() {
    const { repositoryDropdownOptions, dataTableList, repositoryDropdownValue } = this.state;
    if (!AuthService.isUserAuthenticated()) {
      return <Redirect to="/login" />;
    }

    return (
      <Grid className="home" relaxed="very">
        <Grid.Column width={4}>
          <SideMenu />
        </Grid.Column>

        <Grid.Column className="clear-left-padding" width={12}>
          <Grid centered>
            <Grid.Column width={15}>
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

              <Grid.Row>
                <DataTable
                  dataTableList={dataTableList}
                  onRepositoryNameClick={this.handleRepositoryFilter}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Home;
