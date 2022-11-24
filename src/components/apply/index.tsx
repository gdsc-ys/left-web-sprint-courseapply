import '@components/apply/index.css';
import { useTable, useRowSelect } from 'react-table';
import { useState, useEffect, useMemo } from 'react';
import { stringify } from 'querystring';

import { Course } from '@/interfaces/Course';
/**
 * 신청 목록 리스트
 */

export default function Apply({}) {
  const columns = useMemo(() => {
    return [
      { header: '학부', accessor: 'college' },
      { header: '과목명', accessor: 'name' },
      { header: '학정번호', accessor: 'id' },
      { header: '교수명', accessor: 'professor' },
      { header: '강의 시간', accessor: 'times' },
      { header: '강의실', accessor: 'classroom' },
      { header: '정원', accessor: 'personnel' },
      { header: '학점', accessor: 'credit' },
    ];
  }, []);
  const [data, setData] = useState<Course[]>([]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
    /** 
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
            console.log(row)
            return (
              <div>
                <GetContainerDetail />
              </div>
            )
          },
        },
      ])
    },*/
  );
  return (
    <div className="">
      <table
        className="table"
        {...getTableProps({
          style: {
            border: 0,
          },
        })}
      >
        <div className="table-head">
          {headerGroups.map((headerGroup) => (
            <div
              className="head-row"
              {...headerGroup.getHeaderGroupProps({
                style: {
                  border: 0,
                },
              })}
            >
              {headerGroup.headers.map((column) => (
                <div
                  className="thead"
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
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="tableBody" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div
                className="trow"
                {...row.getRowProps({
                  style: {
                    width: '2300px',
                    border: 0,
                    borderTop: '1px solid rgba(50 , 50 , 50, 0.2)',
                    borderBottom: '1px solid rgba(50, 50, 50 ,0.2)',
                    height: '40px',
                  },
                })}
              >
                {row.cells.map((cell) => (
                  <div
                    className="tdata"
                    {...cell.getCellProps({
                      style: {},
                    })}
                  >
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </table>
    </div>
  );
}
