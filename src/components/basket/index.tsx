import React, { useMemo } from 'react';
import { CellProps, Column, HeaderGroup, Hooks, useTable } from 'react-table';

import { apply, ApplyRequest } from '@/apis/mycourse';
import { Course } from '@/interfaces/Course';
import { CourseForTable } from '@/interfaces/Table';
import { columnData } from '@components/basket/basketcolumns';
import { courses } from '@data/examples';

interface Props {
  basket: string[];
  setBasket: (basket: string[]) => void;
}

export default function Basket({ basket, setBasket }: Props) {
  const handleApply = (courseIndex: number) => {
    const coursetoApply: ApplyRequest = {
      id: basket[courseIndex],
    };
    apply(coursetoApply);
  };

  const handleDelete = (courseIndex: number) => {
    const courseId = basket[courseIndex];
    console.log(courseId);
    const newBasket: string[] = basket.filter((id) => id != courseId);
    for (let i = 0; i < basketTableCourses.length; i++) {
      if (basketTableCourses[i].id == courseId) {
        basketTableCourses.splice(i, 1);
      }
    }
    localStorage.setItem('basket', JSON.stringify(newBasket));
    setBasket(newBasket);
  };

  console.log(basket);

  const filteredCourse: Course[] = [];
  for (let i = 0; i < basket.length; i++) {
    for (let j = 0; j < courses.length; j++) {
      if (basket[i] === courses[j].id) {
        filteredCourse.push(courses[j]);
      }
    }
  }
  console.log(filteredCourse);

  const basketTableCourses: CourseForTable[] = [];
  for (let i = 0; i < filteredCourse.length; i++) {
    let courseTime = ' ';
    for (let j = 0; j < filteredCourse[i].times.length; j++) {
      courseTime += `[${filteredCourse[i].times[j].dayOfWeek} ${filteredCourse[i].times[j].startPeriod}-${filteredCourse[i].times[j].endPeriod}]`;
    }
    console.log(courseTime);
    const {
      classroom,
      college,
      credit,
      degree,
      id,
      major,
      name,
      personnel,
      professor,
    } = filteredCourse[i];

    const example: CourseForTable = {
      id: id,
      degree: degree,
      college: college,
      major: major,
      name: name,
      professor: professor,
      times: courseTime,
      classroom: classroom,
      personnel: personnel,
      credit: credit,
    };

    basketTableCourses.push(example);
  }
  console.log(basketTableCourses);

  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => basketTableCourses, [basket]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<CourseForTable>(
      { columns, data },
      (hooks: Hooks<CourseForTable>) => {
        hooks.allColumns.push((columns) => [
          {
            id: 'checkbox',
            Header: () => <div>{'Select'}</div>,
            Cell: ({ row }: CellProps<CourseForTable>) => {
              return <input type="checkbox" id="basketcheck"></input>;
            },
          },
          ...columns,
        ]);
      },
      (hooks: Hooks<CourseForTable>) => {
        hooks.allColumns.push((columns) => [
          ...columns,
          {
            id: 'applybutton',
            Header: () => <div>{'Apply'}</div>,
            Cell: ({ row }: CellProps<CourseForTable>) => {
              return (
                <button onClick={() => handleApply(row.index)}>Apply</button>
              );
            },
          },
        ]);
      },
      (hooks: Hooks<CourseForTable>) => {
        hooks.allColumns.push((columns) => [
          ...columns,
          {
            id: 'deletebutton',
            Header: () => <div>{'Delete'}</div>,
            Cell: ({ row }: CellProps<CourseForTable>) => {
              return (
                <button onClick={() => handleDelete(row.index)}>Delete</button>
              );
            },
          },
        ]);
      },
    );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => {
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
        {rows.map((row) => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr key={key} {...restRowProps}>
              {row.cells.map((cell) => {
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
      <tfoot>
        <button>전체 신청</button>
      </tfoot>
    </table>
  );
}
