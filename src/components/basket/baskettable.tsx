import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import { courses } from '@/data/examples/index';
import { columnData } from '@components/basket/basketcolumns';

export default function BasketTable() {
  const columns = useMemo(() => columnData, []);
  const data = useMemo(() => courses, []);

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
        {rows.map((row: any) => {
          prepareRow(row);
          return (
            // eslint-disable-next-line react/jsx-key
            <tr {...row.getRowProps()}>
              {row.cells.map((cell: any) => (
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
