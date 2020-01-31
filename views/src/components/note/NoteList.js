import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const getCaret = direction => {
  if (direction === 'asc') {
    return (
      <span>
        {' '}
        <i className="fa fa-sort-asc" aria-hidden="true" />
      </span>
    );
  }

  if (direction === 'desc') {
    return (
      <span>
        {' '}
        <i className="fa fa-sort-desc" aria-hidden="true" />
      </span>
    );
  }

  return (
    <span>
      {' '}
      <i className="fa fa-sort" aria-hidden="true" />
    </span>
  );
};

const dateFormatter = cell => {
  return new Date(cell).toLocaleString();
};

class NoteList extends React.Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      noDataText: 'No data'
    };

    this.selectRowProp = {
      mode: 'radio',
      bgColor: '#c1f291',
      onSelect: props.handleRowSelect,
      clickToSelect: true,
      hideSelectColumn: true
    };
  }

  render() {
    return (
      <BootstrapTable
        data={this.props.notes}
        selectRow={this.selectRowProp}
        options={this.options}
        bordered={false}
        striped
        hover
        condensed
      >
        <TableHeaderColumn dataField="_id" isKey hidden>
          Id
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="title"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: 'TextFilter', delay: 0 }}
          columnTitle
        >
          Title
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="date"
          dataFormat={dateFormatter}
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: 'DateFilter', delay: 0 }}
          columnTitle
        >
          Date
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="daysToShow"
          dataSort={true}
          caretRender={getCaret}
          columnTitle
        >
          DaysToShow
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="body"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: 'TextFilter', delay: 0 }}
          columnTitle
        >
          Body
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="level"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: 'TextFilter', delay: 0 }}
          columnTitle
        >
          Level
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="group"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: 'TextFilter', delay: 0 }}
          columnTitle
        >
          Group
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="emails"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: 'TextFilter', delay: 0 }}
          columnTitle
        >
          Emails
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="numbers"
          dataSort={true}
          caretRender={getCaret}
          filter={{ type: 'TextFilter', delay: 0 }}
          columnTitle
        >
          Numbers
        </TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default NoteList;
