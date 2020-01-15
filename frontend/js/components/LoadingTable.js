import React from 'react';
import PropTypes from 'prop-types';
import { Table, Placeholder } from 'semantic-ui-react';

const LoadingDataTable = (props) => {
  const { totalColumns, totalRows } = props;
  const tableRows = [];
  const tableRowCells = [];
  const tableHeaderCell = [];

  for (let i = 0; i < totalColumns; i += 1) {
    tableHeaderCell.push(
      <Table.HeaderCell>
        <Placeholder>
          <Placeholder.Line length="full" />
        </Placeholder>
      </Table.HeaderCell>
    );
  }

  for (let i = 0; i < totalColumns; i += 1) {
    tableRowCells.push(
      <Table.Cell>
        <Placeholder>
          <Placeholder.Line length="full" />
        </Placeholder>
      </Table.Cell>
    );
  }

  for (let i = 0; i < totalRows; i += 1) {
    tableRows.push(<Table.Row>{tableRowCells}</Table.Row>);
  }

  return (
    <Table basic="very" celled>
      <Table.Header fullWidth>
        <Table.Row>{tableHeaderCell}</Table.Row>
      </Table.Header>

      <Table.Body className="table-body">{tableRows}</Table.Body>
    </Table>
  );
};

LoadingDataTable.propTypes = {
  totalColumns: PropTypes.number,
  totalRows: PropTypes.number,
};

export default LoadingDataTable;
