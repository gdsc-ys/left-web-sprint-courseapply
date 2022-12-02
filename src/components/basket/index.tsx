import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import { apply, ApplyRequest } from '@/apis/mycourse';
import { Course } from '@/interfaces/Course';
import { CourseForTable } from '@/interfaces/Table';
import { columnData } from '@components/basket/basketcolumns';
import { courses } from '@data/examples';

interface Props {
  basket: string[];
}

export default function Basket({ basket }: Props) {
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
    basket = newBasket;
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    useTable({ columns, data });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          // eslint-disable-next-line react/jsx-key
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              // eslint-disable-next-line react/jsx-key
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...row.getRowProps()}>
              <input type="checkbox" id="basketcheck"></input>
              {row.cells.map((cell) => (
                // eslint-disable-next-line react/jsx-key
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
              <button onClick={() => handleApply(row.index)}>Apply</button>
              <button onClick={() => handleDelete(row.index)}>Delete</button>
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
