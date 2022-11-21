import { useMemo } from 'react';
import { table } from 'console';

import BasketTable from '@components/basket/baskettable';
import { courses } from '@data/examples/index';

export default function Basket() {
  const columns = useMemo(
    () => [
      {
        accessor: 'id',
        Header: 'ID',
      },
      {
        accessor: 'college',
        Header: 'College',
      },
      {
        accessor: 'name',
        Header: 'Name',
      },
      {
        accessor: 'professor',
        Header: 'Professor',
      },
      {
        accessor: 'times',
        Header: 'Times',
      },
      {
        accessor: 'classroom',
        Header: 'Classroom',
      },
      {
        accessor: 'personnel',
        Header: 'Personnel',
      },
      {
        accessor: 'credit',
        Header: 'Credit',
      },
    ],
    [],
  );

  return <BasketTable columns={columns} data={courses}></BasketTable>;
}
