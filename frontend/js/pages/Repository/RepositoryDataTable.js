import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';

class RepositoryDataTable extends React.Component {
  renderTableRows() {
    const { repositories } = this.props;

    return repositories.map((data) => {
      return (
        <Table.Row key={data.pk}>
          <Table.Cell>{data.name}</Table.Cell>
          <Table.Cell>{data.description}</Table.Cell>
          <Table.Cell>{data.language}</Table.Cell>
          <Table.Cell>{data.stargazers_count}</Table.Cell>
          <Table.Cell>{data.disabled ? 'Sim' : 'Não'}</Table.Cell>
          <Table.Cell>{data.clone_url}</Table.Cell>
          <Table.Cell>{new Date(data.created_at).toLocaleDateString()}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Table basic="very" celled>
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell>Nome</Table.HeaderCell>
            <Table.HeaderCell>Descrição</Table.HeaderCell>
            <Table.HeaderCell>Linguagem</Table.HeaderCell>
            <Table.HeaderCell>Estrelas</Table.HeaderCell>
            <Table.HeaderCell>Desativado</Table.HeaderCell>
            <Table.HeaderCell>Clonar</Table.HeaderCell>
            <Table.HeaderCell>Criado em</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.renderTableRows()}</Table.Body>
      </Table>
    );
  }
}

RepositoryDataTable.propTypes = {
  repositories: PropTypes.array,
};

export default RepositoryDataTable;
