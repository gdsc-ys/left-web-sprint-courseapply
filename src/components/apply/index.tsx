import '@components/apply/index.css';
import {useTable, useRowSelect} from 'react-table'
import {useState, useEffect} from 'react' 

/**
 * 신청 목록 리스트
 */

export default function Apply({}) {
    return <div></div>
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleRowSelected,
  } = useTable(
    { columns, data, defaultColumn },
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          disableResizing: true,
          minWidth: 35,
          width: 35,
          maxWidth: 35,
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                {...row.getToggleRowSelectedProps()}
                selectedFlatRows={selectedFlatRows}
                setContainersToDelete={setContainersToDelete}
              />
            </div>
          ),
        },
        ...columns,
      ])
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        // fix the parent group of the selection button to not be resizable
        const selectionGroupHeader = headerGroups[0].headers[0]
        selectionGroupHeader.canResize = false
      })
    },
    (hooks) => {
      hooks.allColumns.push((columns) => [
        ...columns,
        {
          id: 'getDetails',
          disableResizing: true,
          minWidth: 80,
          width: 80,
          maxWidth: 80,
          Header: () => <div>{'Get Details'}</div>,
          Cell: ({ row }) => {
            return (
              <div>
                <GetContainerDetail />
              </div>
            )
          },
        },
      ])
      hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
        const curLength = Object.keys(headerGroups[0].headers).length
        const selectionGroupHeader = headerGroups[0].headers[curLength - 1]
        selectionGroupHeader.canResize = false
      })
    },
  )

  useEffect(() => {
    setContainersToDelete(
      selectedFlatRows.map((comp) => {
        return comp.original['containerId']
      }),
    )
  }, [selectedFlatRows])

  return (
    <div className="">
      <table className = "table"
        {...getTableProps({
          style: {
            border: 0,
          },
        })}
      >
        <div className = "table-head">
          {headerGroups.map((headerGroup) => (
            <div className= "head-row"
              {...headerGroup.getHeaderGroupProps({
                style: {
                  border: 0,
                },
              })}
            >
              {headerGroup.headers.map((column) => (
                <div className="thead"
                  {...column.getHeaderProps({
                    style: {
                      border: 0,
                      background: 'rgb(240, 240, 240)',
                      color: 'black',
                      fontWeight: 'bold',
                      position: `${
                        headerGroup.headers.indexOf(column) === 0 ||
                        headerGroup.headers.indexOf(column) === 1
                          ? 'sticky'
                          : 'static'
                      }`,
                      zIndex: `${
                        headerGroup.headers.indexOf(column) === 0 ||
                        headerGroup.headers.indexOf(column) === 1
                          ? '3'
                          : 'none'
                      }`,
                      left: headerGroup.headers.indexOf(column) === 1 ? 35 : 0,
                    },
                  })}
                >
                  {column.render('Header')}
                  {column.canResize && (
                    <Resizer {...column.getResizerProps()} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div  className = "tableBody" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <div className="trow"
                {...row.getRowProps({
                  style: {
                    width: '2300px',
                    border: 0,
                    borderTop: '1px solid rgba(50 , 50 , 50, 0.2)',
                    borderBottom: '1px solid rgba(50, 50, 50 ,0.2)',
                    height: '40px',
                  },
                })}
                onClick={() => {
                  row.toggleRowSelected(!row.isSelected)
                }}
              >
                {row.cells.map((cell) => (
                  <div
                  className="tdata"
                    {...cell.getCellProps({
                      style: {
                        
                      },
                    })}
                  >
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>

  return <div></div>;
}
