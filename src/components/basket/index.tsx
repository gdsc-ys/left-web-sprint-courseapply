import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import { columnData } from '@components/basket/basketcolumns';

interface Props {
  basket: string[];
}

export default function Basket({ basket }: Props) {
  const courses1 = [
    {
      id: 'CSI1',
      college: '공과대학',
      name: '데이터베이스',
      professor: '윤강석',
      times: 'MON 2-4 WED 2-4',
      classroom: '공A999',
      personnel: 20,
      credit: 3,
    },
    {
      id: 'CSI2',
      college: '공과대학',
      name: '웹',
      professor: '윤강석',
      times: 'MON 2-4 WED 2-4',
      classroom: '공A999',
      personnel: 20,
      credit: 3,
    },
  ];
  console.log(basket);
  //const index = courses.findIndex((element) => element.id == props.courseId);
  //const courseData = courses[index];
  //console.log(courseData?.times);
  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => courses1, []);

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
              {row.cells.map((cell) => (
                // eslint-disable-next-line react/jsx-key
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
