import '@components/apply/index.css';

import { useEffect, useMemo, useState } from 'react';
import { CellProps, Column, HeaderGroup, useTable } from 'react-table';

import WithdrawButton from '@components/apply/withdrawButton';
import { Course } from '@interfaces/Course';
import { CourseForTable } from '@interfaces/Table';

//import WithdrawButton from './applyButton';

/**
 * 신청 목록 리스트
 */

interface ApplyInterface {
  appliedCourses: Course[];
  setAppliedCourses: (appliedCourses: Course[]) => void;
}

export default function Apply({
  appliedCourses,
  setAppliedCourses,
}: ApplyInterface) {
  interface CourseForApplyTable extends CourseForTable {
    withdraw: string;
  }

  const [data, setData] = useState<CourseForApplyTable[]>([]);

  useEffect(() => {
    const newCourses: Array<CourseForApplyTable> = appliedCourses?.map(
      (course: Course) => {
        const timesToArray: string[] = course.times.reduce(
          (acc: string[], cur) => {
            acc.push(
              `[${cur.dayOfWeek.slice(0, 1)}${cur.startPeriod}${
                cur.endPeriod
              }]`,
            );
            return acc;
          },
          [],
        );
        const timesToString = timesToArray.join();
        return {
          ...course,
          times: timesToString,
          withdraw: '',
        };
      },
    );
    if (newCourses) {
      setData(newCourses);
    }
  }, []);

  const columns = useMemo<Array<Column<CourseForApplyTable>>>(() => {
    return [
      {
        Header: '취소',
        accessor: 'withdraw',
        Cell: ({ row }: CellProps<CourseForApplyTable>) => {
          return (
            <WithdrawButton
              coursesForTable={row.original}
              setAppliedCourses={setAppliedCourses}
            />
          );
        },
      },
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
    useTable<CourseForApplyTable>({ data, columns });
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
          {headerGroups.map((headerGroup: HeaderGroup<CourseForApplyTable>) => {
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
