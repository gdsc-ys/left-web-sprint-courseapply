import '@components/apply/index.css';

import { useEffect, useMemo, useState } from 'react';
import { CellProps, Column, HeaderGroup, Hooks, useTable } from 'react-table';

import WithdrawButton from '@components/apply/withdrawButton';
import { Course } from '@interfaces/Course';
import { CourseForTable } from '@interfaces/Table';

//import WithdrawButton from './applyButton';

/**
 * 신청 목록 리스트
 */

export default function Apply({
  appliedCourses,
  setAppliedCourses,
}: {
  appliedCourses: Course[] | undefined;
  setAppliedCourses: (appliedCourses: Course[] | undefined) => void;
}) {
  const [data, setData] = useState<CourseForTable[]>([]);

  useEffect(() => {
    const newCourses = appliedCourses?.map((course: Course) => {
      const timesToString = course.times.reduce((acc, cur, idx) => {
        acc += `[${cur.dayOfWeek.slice(0, 1)}${cur.startPeriod},${
          cur.endPeriod
        }]`;
        if (idx != course.times.length - 1) {
          acc += ',';
        }
        return acc;
      }, '');
      return {
        ...course,
        times: timesToString,
      };
    });
    if (newCourses) {
      setData(newCourses);
    }
  }, []);

  const columns = useMemo<Column<CourseForTable>[]>(() => {
    return [
      { Header: '학정번호', accessor: 'id' },
      { Header: '과목명', accessor: 'name' },
      { Header: '학위', accessor: 'degree' },
      { Header: '학부', accessor: 'college' },
      { Header: '전공', accessor: 'major' },
      { Header: '교수명', accessor: 'professor' },
      { Header: '강의 시간', accessor: 'times' },
      { Header: '강의실', accessor: 'classroom' },
      { Header: '정원', accessor: 'personnel' },
      { Header: '학점', accessor: 'credit' },
    ];
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<CourseForTable>(
      { columns, data },
      (hooks: Hooks<CourseForTable>) => {
        hooks.allColumns.push((columns) => [
          {
            id: 'withdraw',
            disableResizing: true,
            minWidth: 100,
            width: 100,
            maxWidth: 100,
            Header: () => <div>{'취소'}</div>,
            Cell: ({ row }: CellProps<CourseForTable>) => {
              return (
                <WithdrawButton
                  coursesForTable={row.original}
                  setAppliedCourses={setAppliedCourses}
                />
              );
            },
          },
          ...columns,
        ]);
      },
    );
  return (
    <div className="apply-table">
      <table
        className="table"
        {...getTableProps({
          style: {
            width: '90%',
            border: '1px solid rgb(200, 200, 200)',
            borderCollapse: 'collapse',
          },
        })}
      >
        <thead className="table-head">
          {headerGroups.map((headerGroup: HeaderGroup<CourseForTable>) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps({
                style: {
                  border: '1px solid rgb(200, 200, 200)',
                },
              });
            return (
              <tr className="head-row" key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restHeaderProps } = column.getHeaderProps();
                  return (
                    <th className="thead" key={key} {...restHeaderProps}>
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody className="tableBody" {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps({
              style: { height: '40px', textAlign: 'center' },
            });
            return (
              <tr className="trow" key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td className="tdata" key={key} {...restCellProps}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
