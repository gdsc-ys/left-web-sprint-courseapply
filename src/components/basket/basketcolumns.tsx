import { Column } from 'react-table';

import { CourseForTable } from '@/interfaces/Table';

export const columnData: Column<CourseForTable>[] = [
  {
    accessor: 'id',
    Header: 'ID',
  },
  {
    accessor: 'degree',
    Header: 'Degree',
  },
  {
    accessor: 'college',
    Header: 'College',
  },
  {
    accessor: 'major',
    Header: 'Major',
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
];
