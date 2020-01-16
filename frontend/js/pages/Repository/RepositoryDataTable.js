import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class RepositoryDataTable extends React.Component {
  renderTableRows() {
    const { repositories } = this.props;

    if (repositories.length === 0) {
      return (
        <Table.Row>
          <Table.Cell>Sem commits registrados.</Table.Cell>
        </Table.Row>
      );
    }

    return repositories.map((data) => {
      return (
        <Table.Row key={data.pk}>
          <Table.Cell>
            <Link to={`/repositories/${data.pk}`}>{data.name}</Link>
          </Table.Cell>
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
            <Table.HeaderCell>Qtd estrelas</Table.HeaderCell>
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
