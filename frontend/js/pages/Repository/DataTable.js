import React from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Image } from 'semantic-ui-react';

class DataTable extends React.Component {
  renderTableRows() {
    const { dataTableList } = this.props;

    return dataTableList.map((data) => {
      return (
        <Table.Row key={data.sha}>
          <Table.Cell>
            <Header as="h4" image>
              <Image rounded size="mini" src={data.author.avatar_url} />
              <Header.Content>
                <Header.Subheader>{data.author.name}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell width={8}>{data.message}</Table.Cell>
          <Table.Cell>{data.sha.slice(0, 7)}</Table.Cell>
          <Table.Cell>{new Date(data.authored_date).toLocaleDateString()}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Table>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4">Commits</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.renderTableRows()}</Table.Body>
      </Table>
    );
  }
}

DataTable.propTypes = {
  dataTableList: PropTypes.array,
};

export default DataTable;
