import React from 'react';
import MyGrid from './MyGrid';
import './index.css';

export default class MyGridAndButtons extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddRowClick = this.handleAddRowClick.bind(this);
    this.handleAddColClick = this.handleAddColClick.bind(this);
    this.handleRemoveColClick = this.handleRemoveColClick.bind(this);
    this.handleRemoveRowClick = this.handleRemoveRowClick.bind(this);
    this.handleOnShowDelColButton = this.handleOnShowDelColButton.bind(this);
    this.handleOnShowDelRowButton = this.handleOnShowDelRowButton.bind(this);
    this.handleOnHideButtons = this.handleOnHideButtons.bind(this);
    this.delayedHideButtons = this.delayedHideButtons.bind(this);
    this.handleRemoveColMouseOver = this.handleRemoveColMouseOver.bind(this);
    this.handleRemoveRowMouseOver = this.handleRemoveRowMouseOver.bind(this);

    const data = [];
    for (let i = 0; i < 5; i += 1) {
      data[i] = [];
      for (let j = 0; j < 5; j += 1) {
        data[i][j] = `${i} : ${j}`;
      }
    }

    this.showDelColButton = false;
    this.showDelRowButton = false;
    this.state = {
      cells: data,
      colNumber: -1,
      rowNumber: -1,
      showDelColButton: false,
      showDelRowButton: false,
      topPos: -1,
      leftPos: -1,
    };
  }

  handleAddColClick() {
    const data = this.state.cells.slice();
    for (let i = 0; i < data.length; i += 1) {
      data[i][data[i].length] = `${i} : ${data[i].length}`;
    }
    this.setState({ cells: data });
  }

  handleAddRowClick() {
    const data = this.state.cells.slice();
    const row = [];
    for (let i = 0; i < data[0].length; i += 1) {
      row[i] = `${data.length} : ${i}`;
    }
    data.push(row);
    this.setState({ cells: data });
  }

  handleRemoveColClick() {
    const data = this.state.cells.slice();
    for (let i = 0; i < data.length; i += 1) {
      data[i].splice(this.state.colNumber, 1);
    }
    this.setState({ cells: data });
  }

  handleRemoveRowClick() {
    const data = this.state.cells.slice();
    data.splice(this.state.rowNumber, 1);
    this.setState({ cells: data });
  }

  handleOnShowDelColButton(colIndex, leftPosition) {
    this.showDelColButton = true;
    this.setState({ showDelColButton: true, colNumber: colIndex, leftPos: leftPosition });
  }

  handleOnShowDelRowButton(rowIndex, topPosition) {
    this.showDelRowButton = true;
    this.setState({ showDelRowButton: true, rowNumber: rowIndex, topPos: topPosition });
  }

  handleOnHideButtons() {
    this.showDelColButton = false;
    this.showDelRowButton = false;
    setTimeout(this.delayedHideButtons,
      100);
  }

  delayedHideButtons() {
    if (!this.showDelColButton) {
      this.setState({ showDelColButton: false });
    }
    if (!this.showDelRowButton) {
      this.setState({ showDelRowButton: false });
    }
  }

  handleRemoveColMouseOver() {
    this.showDelColButton = true;
  }

  handleRemoveRowMouseOver() {
    this.showDelRowButton = true;
  }

  render() {
    const data = this.state.cells;

    const hideDelRowButton = (!this.state.showDelRowButton) || (data.length === 1) ||
      (this.state.rowNumber >= data.length);
    const hideDelColButton = (!this.state.showDelColButton) || (data[0].length === 1) ||
      (this.state.colNumber >= data[0].length);

    return (
      <div className={'myCompo'}>
        <button
          className={'myCompo__btn myCompo__btn-fade myCompo__btn-remove myCompo__btn-remove-col'}
          hidden={hideDelColButton}
          style={{ left: this.state.leftPos }}
          onClick={this.handleRemoveColClick}
          onMouseOver={this.handleRemoveColMouseOver}
          onMouseOut={this.handleOnHideButtons}
        >-
        </button>
        <button
          className={'myCompo__btn myCompo__btn-fade myCompo__btn-remove myCompo__btn-remove-row'}
          hidden={hideDelRowButton}
          style={{ top: this.state.topPos }}
          onClick={this.handleRemoveRowClick}
          onMouseOver={this.handleRemoveRowMouseOver}
          onMouseOut={this.handleOnHideButtons}
        >-
        </button>
        <MyGrid
          data={data}
          onShowDelColButton={this.handleOnShowDelColButton}
          onShowDelRowButton={this.handleOnShowDelRowButton}
          onHideButtons={this.handleOnHideButtons}
        />
        <button
          className={'myCompo__btn myCompo__btn-fade myCompo__btn-add myCompo__btn-add-col'}
          onClick={this.handleAddColClick}
        >+
        </button>
        <button
          className={'myCompo__btn myCompo__btn-fade myCompo__btn-add myCompo__btn-add-row'}
          onClick={this.handleAddRowClick}
        >+
        </button>
      </div>
    );
  }
}
