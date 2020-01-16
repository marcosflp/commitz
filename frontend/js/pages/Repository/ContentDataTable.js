import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon } from 'semantic-ui-react';

class ContentDataTable extends React.Component {
  renderTableRows() {
    const { dataTableList } = this.props;
    let icon;

    return dataTableList.map((data) => {
      if (data.type === 'file') {
        icon = <Icon name="file outline" />;
      } else if (data.type === 'dir') {
        icon = <Icon name="folder" />;
      }

      return (
        <Table.Row key={data.sha}>
          <Table.Cell>
            {icon} {data.name}
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Table celled striped>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>Arquivos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.renderTableRows()}</Table.Body>
      </Table>
    );
  }
}

ContentDataTable.propTypes = {
  dataTableList: PropTypes.array,
};

export default ContentDataTable;
