import React from 'react';
import PropTypes from 'prop-types';
import { Header, Table, Image } from 'semantic-ui-react';

class CommitDataTable extends React.Component {
  renderTableRows() {
    const { dataTableCommits, onRepositoryNameClick } = this.props;

    if (dataTableCommits.length === 0) {
      return (
        <Table.Row>
          <Table.Cell>Sem repositórios registrados.</Table.Cell>
        </Table.Row>
      );
    }

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
            <span
              className="fake-link"
              id={data.repository.pk}
              role="link"
              tabIndex={0}
              onClick={onRepositoryNameClick}
              onKeyPress={onRepositoryNameClick}
            >
              {data.repository.full_name}
            </span>
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
  onRepositoryNameClick: PropTypes.func,
};

export default CommitDataTable;
