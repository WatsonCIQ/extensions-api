import React from 'react';
import { AutoSizer, MultiGrid } from 'react-virtualized';
import './styles/DataTable.css';
import { fdc3 } from "@chartiq/fpe-router";

function DataTableComponent(props) {
  const cellRenderer = ({ columnIndex, key, rowIndex, style }) => {

    const BroadcastButton = ({ ticker }) => <button onClick={() => {
      fdc3.broadcast({
        type: 'fdc3.instrument',
        id: {
          ticker
        }
      })
    }}>💱</button>

    const IntentButton = ({ ticker }) => <button onClick={() => {
      fdc3.raiseIntent("ViewChart", {
        type: 'fdc3.instrument',
        id: {
          ticker
        }
      })
    }}>📈</button>


    if (rowIndex === 0) {
      const onHeaderClicked = () => {
        props.onHeaderClicked(props.headers[columnIndex]);
        return false;
      };

      return (<div className='cell header' key={key} style={style}>
        <button type='button' className='link-button' onClick={onHeaderClicked}>{props.headers[columnIndex]}</button>
      </div>);
    } else {
      return (<div className={'cell ' + (rowIndex % 2 === 1 ? 'odd' : 'even')} key={key} style={style} >
        {props.rows[rowIndex - 1][columnIndex]}
        {}
        {props.headers[columnIndex] === "Ticker" && <>
          <BroadcastButton ticker={props.rows[rowIndex - 1][columnIndex]}></BroadcastButton>

          <IntentButton ticker={props.rows[rowIndex - 1][columnIndex]}></IntentButton>
        </>
        }
      </div>);
    }
  };

  return (
    <div className='dataTable'>
      <AutoSizer>
        {({ height, width }) => (
          <MultiGrid
            key={props.dataKey || -1}
            fixedRowCount={1}
            className='grid'
            cellRenderer={cellRenderer}
            columnCount={props.headers.length}
            columnWidth={150}
            height={height}
            rowCount={props.rows.length + 1}
            rowHeight={30}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
}

export default DataTableComponent;
