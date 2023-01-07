import '@components/courses/index.css';
import { Course, CourseTime } from '@interfaces/Course';
import { CourseForTable } from '@interfaces/Table';
import { useEffect, useState, useMemo } from 'react';
import { useTable, CellProps, Column, HeaderGroup } from 'react-table';

interface Props {
  handleAddBasket: (courseId: string) => void;
}
export default function Courses({ courses }: { courses: Course[] }) {
  const columns = useMemo<Column<CourseForTable>[]>(() => {
    return [
      {
        id: 'preferred',
        Header: () => <div>{'추가'}</div>,
        Cell: ({ row }: CellProps<CourseForTable>) => (
          <div>
            {/* <button onClick={() => handleAddBasket(row.cells[1].value)}>Add</button> */}
            {/* 위 버튼은 주석 풀고, 아래 버튼은 삭제해서 사용하면 됨 */}
            <button>Add</button>
          </div>
        ),
      },
      { accessor: 'id', Header: '학정번호' },
      { accessor: 'name', Header: '과목명' },
      { accessor: 'degree', Header: '학위' },
      { accessor: 'college', Header: '학부' },
      { accessor: 'major', Header: '전공' },
      { accessor: 'professor', Header: '교수명' },
      { accessor: 'times', Header: '강의 시간' },
      { accessor: 'classroom', Header: '강의실' },
      { accessor: 'personnel', Header: '정원' },
      { accessor: 'credit', Header: '학점' },
    ];
  }, []);
  const [data, setData] = useState<CourseForTable[]>([]);

  useEffect(() => {
    const newCourses = courses.map((course: Course) => {
      const newTimesArr = course.times.map((schedule: CourseTime) => {
        return (
          schedule.dayOfWeek +
          ' ' +
          schedule.startPeriod +
          '교시-' +
          schedule.endPeriod +
          '교시'
        );
      });
      const newTimes = newTimesArr.join(', ');

      return {
        ...course,
        times: newTimes,
      };
    });
    setData(newCourses);
  }, [courses]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<CourseForTable>({ columns, data });

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: HeaderGroup<CourseForTable>) => {
            const { key, ...restHeaderGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key, ...restHeaderProps } = column.getHeaderProps();
                  return (
                    <th key={key} {...restHeaderProps}>
                      {column.render('Header')}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            const { key, ...restRowsProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowsProps}>
                {row.cells.map((cell: any) => {
                  const { key, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={key} {...restCellProps}>
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
