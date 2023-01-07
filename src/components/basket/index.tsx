import React, { useEffect, useMemo } from 'react';
import { CellProps, Column, HeaderGroup, Hooks, useTable } from 'react-table';
import { check } from 'prettier';

import { apply, ApplyRequest } from '@/apis/mycourse';
import { Course } from '@/interfaces/Course';
import { CourseForTable } from '@/interfaces/Table';
import { columnData } from '@components/basket/basketcolumns';
import { courses } from '@data/examples';

interface Props {
  basket: string[];
  setBasket: (basket: string[]) => void;
  setAppliedCourses: (appliedCourses: Array<Course>) => void;
}

export default function Basket({
  basket,
  setBasket,
  setAppliedCourses,
}: Props) {
  const handleApply = async (courseIndex: number) => {
    const tempBasket = JSON.parse(localStorage.getItem('basket') ?? '[]');
    const coursetoApply: ApplyRequest = {
      id: tempBasket[courseIndex],
    };
    const newAppliedCourses = await apply(coursetoApply);
    setAppliedCourses(newAppliedCourses);
  };

  /**
   함수는 useCallback 감싸세요!
   */

  const handleDelete = (courseIndex: number) => {
    const tempBasket = JSON.parse(localStorage.getItem('basket') ?? '[]');
    const courseId = tempBasket[courseIndex];
    const newBasket: string[] = tempBasket.filter(
      (id: number) => id != courseId,
    );
    for (let i = 0; i < basketTableCourses.length; i++) {
      if (basketTableCourses[i].id == courseId) {
        basketTableCourses.splice(i, 1);
      }
    }
    localStorage.setItem('basket', JSON.stringify(newBasket));
    setBasket(newBasket);
  };

  const checkedList: number[] = [];

  const handleCheck = (courseIndex: number) => {
    if (checkedList.includes(courseIndex)) {
      checkedList.splice(checkedList.indexOf(courseIndex), 1);
    } else {
      checkedList.push(courseIndex);
    }
  };

  const handleApplyAll = async () => {
    const tempBasket = JSON.parse(localStorage.getItem('basket') ?? '[]');
    checkedList.map(async (courseIndex) => {
      const coursetoApply: ApplyRequest = {
        id: tempBasket[courseIndex],
      };
      const newAppliedCourses = await apply(coursetoApply);
      setAppliedCourses(newAppliedCourses);
    });
  };
  /**
   id list 에 디펜던시를 가집니다. 그죠? 그거에 맞춰서 수정하세요. useMemo or useEffect 잘쓰기, for 중첩 없애보자!
   */
  const filteredCourse: Course[] = [];
  for (let i = 0; i < basket.length; i++) {
    for (let j = 0; j < courses.length; j++) {
      if (basket[i] === courses[j].id) {
        filteredCourse.push(courses[j]);
      }
    }
  }

  const basketTableCourses: CourseForTable[] = [];
  for (let i = 0; i < filteredCourse.length; i++) {
    let courseTime = ' ';
    for (let j = 0; j < filteredCourse[i].times.length; j++) {
      courseTime += `[${filteredCourse[i].times[j].dayOfWeek} ${filteredCourse[i].times[j].startPeriod}-${filteredCourse[i].times[j].endPeriod}]`;
    }

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
  // console.log(basketTableCourses);

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
              return (
                <input
                  type="checkbox"
                  id="basketcheck"
                  onClick={() => handleCheck(row.index)}
                ></input>
              );
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
        <button onClick={() => handleApplyAll()}>전체 신청</button>
      </tfoot>
    </table>
  );
}
