import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class MyGrid extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    handleMouseOver(e) {
        const cell = e.target;

        if (cell.classList.contains('myCompo__cell')) {
            let colIndex = cell.cellIndex;
            let rowIndex = cell.parentElement.rowIndex;

            let tblBodyObj = cell.parentElement.parentElement.parentElement.tBodies[0];
            if ((tblBodyObj.rows[0].cells.length > 1) && (colIndex >= 0) && (colIndex < tblBodyObj.rows[0].cells.length)) {
                this.props.onShowDelColButton(colIndex, cell.offsetParent.offsetLeft + cell.offsetLeft);
            }

            if ((tblBodyObj.rows.length > 1) && (rowIndex >= 0) && (rowIndex < tblBodyObj.rows.length)) {
                this.props.onShowDelRowButton(rowIndex, cell.offsetParent.offsetTop + cell.offsetTop);
            }
        }
    }

    handleMouseOut(e) {
        const cell = e.target;
        if (cell.classList.contains('myCompo__cell')) {
            this.props.onHideButtons();
        }
    }

    handleMouseLeave() {
        this.props.onHideButtons();
    }

    dataToTable() {
        return this.props.data.map((rows, i) => {
            let row = rows.map((cell, ii) => <td className={"myCompo__cell"} key={(i+1)*ii}>{cell}</td>);
            return <tr key={i}>{row}</tr>;
        });
    }

    render() {
        return (
            <table className={"myCompo__table"} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} onMouseLeave={this.handleMouseLeave}>
                <tbody>{this.dataToTable()}</tbody>
            </table>
        );
    }
}


class MyGridAndButtons extends React.Component {
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

        let data = [];
        for (let i=0; i<5; i++) {
            data[i] = [];
            for (let j=0; j<5; j++) {
                data[i][j]= i + ' : ' + j;
            }
        }

        this.showDelColButton = false;
        this.showDelRowButton = false;
        this.state = {cells: data, colNumber: -1, rowNumber: -1, showDelColButton: false, showDelRowButton: false, topPos: -1, leftPos:-1};
    }

    handleAddColClick() {
        let data = this.state.cells.slice();
        for (let row of data){
            row[row.length] = data.indexOf(row) + ' : ' + row.length;
        }
        this.setState({cells: data});
    }

    handleAddRowClick() {
        let data = this.state.cells.slice();
        let row = [];
        for (let i=0;i<data[0].length;i++) {
            row[i]= data.length + ' : ' + i;
        }
        data.push(row);
        this.setState({cells: data});
    }

    handleRemoveColClick() {
        let data = this.state.cells.slice();
        for (let row of data){
            row.splice(this.state.colNumber, 1);
        }
        this.setState({cells: data});
    }

    handleRemoveRowClick() {
        let data = this.state.cells.slice();
        data.splice(this.state.rowNumber, 1);
        this.setState({cells: data});
    }

    handleOnShowDelColButton(colIndex, leftPosition) {
        this.showDelColButton = true;
        this.setState({showDelColButton: true, colNumber: colIndex, leftPos: leftPosition});
    }

    handleOnShowDelRowButton(rowIndex, topPosition) {
        this.showDelRowButton = true;
        this.setState({showDelRowButton: true, rowNumber: rowIndex, topPos: topPosition});
    }

    handleOnHideButtons(){
        this.showDelColButton = false;
        this.showDelRowButton = false;
        setTimeout(this.delayedHideButtons,
            100);
    }

    delayedHideButtons(){
        if (!this.showDelColButton){
            this.setState({showDelColButton: false});
        }
        if (!this.showDelRowButton){
            this.setState({showDelRowButton: false});
        }
    }

    render() {
        const data = this.state.cells;

        const hideDelRowButton = (!this.state.showDelRowButton) || (data.length === 1) || (this.state.rowNumber >= data.length);
        const hideDelColButton = (!this.state.showDelColButton) || (data[0].length === 1) || (this.state.colNumber >= data[0].length);

        return (
            <div className={"myCompo"}>
                <button className={"myCompo__btn myCompo__btn-fade myCompo__btn-remove myCompo__btn-remove-col"}
                        hidden={hideDelColButton}
                        style={{left: this.state.leftPos}}
                        onClick={this.handleRemoveColClick}
                        onMouseOver={function () {this.showDelColButton = true;}.bind(this)}
                        onMouseOut={this.handleOnHideButtons}>-</button>
                <button className={"myCompo__btn myCompo__btn-fade myCompo__btn-remove myCompo__btn-remove-row"}
                        hidden={hideDelRowButton}
                        style={{top: this.state.topPos}}
                        onClick={this.handleRemoveRowClick}
                        onMouseOver={function () {this.showDelRowButton = true;}.bind(this)}
                        onMouseOut={this.handleOnHideButtons}>-</button>
                <MyGrid data={data}
                        onShowDelColButton={this.handleOnShowDelColButton}
                        onShowDelRowButton={this.handleOnShowDelRowButton}
                        onHideButtons={this.handleOnHideButtons} />
                <button className={"myCompo__btn myCompo__btn-fade myCompo__btn-add myCompo__btn-add-col"}
                        onClick={this.handleAddColClick}>+</button>
                <button className={"myCompo__btn myCompo__btn-fade myCompo__btn-add myCompo__btn-add-row"}
                        onClick={this.handleAddRowClick}>+</button>
            </div>
        );
    }
}

ReactDOM.render(
    <MyGridAndButtons />,
    document.getElementById('root')
);
