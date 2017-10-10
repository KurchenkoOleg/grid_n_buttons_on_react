import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default class MyGrid extends React.Component {
  constructor(props) {
    super(props);
    this.handleCellMouseOver = this.handleCellMouseOver.bind(this);
  }

  handleCellMouseOver(e) {
    const cell = e.target;

    const colIndex = cell.cellIndex;
    const rowIndex = cell.parentElement.rowIndex;

    const tblBodyObj = this.gridTable.tBodies[0];
    if ((tblBodyObj.rows[0].cells.length > 1) &&
      (colIndex >= 0) && (colIndex < tblBodyObj.rows[0].cells.length)) {
      this.props.onShowDelColButton(colIndex, cell.offsetParent.offsetLeft + cell.offsetLeft);
    }

    if ((tblBodyObj.rows.length > 1) && (rowIndex >= 0) && (rowIndex < tblBodyObj.rows.length)) {
      this.props.onShowDelRowButton(rowIndex, cell.offsetParent.offsetTop + cell.offsetTop);
    }
  }

  dataToTable() {
    return this.props.data.map((rows) => {
      const row = rows.map(cell => (<td
        className={'myCompo__cell'}
        key={Math.random().toString(36).slice(2)}
        onMouseOver={this.handleCellMouseOver}
        onMouseOut={this.props.onHideButtons}
      >{cell}</td>));
      return <tr key={Math.random().toString(36).slice(2)}>{row}</tr>;
    });
  }

  render() {
    return (
      <table
        ref={(table) => { this.gridTable = table; }}
        className={'myCompo__table'}
        onMouseLeave={this.props.onHideButtons}
      >
        <tbody>{this.dataToTable()}</tbody>
      </table>
    );
  }
}

MyGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  onHideButtons: PropTypes.func.isRequired,
  onShowDelRowButton: PropTypes.func.isRequired,
  onShowDelColButton: PropTypes.func.isRequired,
};

MyGrid.defaultProps = {
  data: [],
  onHideButtons: null,
  onShowDelRowButton: null,
  onShowDelColButton: null,
};
