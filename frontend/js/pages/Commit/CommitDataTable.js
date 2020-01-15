import React from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class CommitDataTable extends React.Component {
  renderTableRows() {
    const { dataTableCommits } = this.props;

    return dataTableCommits.map((data) => {
      return (
        <Table.Row key={data.sha}>
          <Table.Cell>
            <Header as="div" image>
              <Image rounded size="mini" src={data.author.avatar_url} />
              <Header.Content>
                <Header.Subheader>{data.author.name}</Header.Subheader>
              </Header.Content>
            </Header>
          </Table.Cell>
          <Table.Cell width={8}>{data.message}</Table.Cell>
          <Table.Cell>
            <Link to={`repositories/${data.repository.pk}/`}>{data.repository.full_name}</Link>
          </Table.Cell>
          <Table.Cell>{new Date(data.authored_date).toLocaleDateString()}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Table basic="very" celled>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Autor</Table.HeaderCell>
            <Table.HeaderCell>Mensagem</Table.HeaderCell>
            <Table.HeaderCell>Repositório</Table.HeaderCell>
            <Table.HeaderCell>Data</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.renderTableRows()}</Table.Body>
      </Table>
    );
  }
}

CommitDataTable.propTypes = {
  dataTableCommits: PropTypes.array,
};

export default CommitDataTable;
