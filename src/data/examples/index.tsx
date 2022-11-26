import { Course, Degree } from '@interfaces/Course';
import { DayOfWeek } from '@interfaces/Date';

export const courses: Course[] = [
  {
    id: 'CSI1',
    degree: Degree.UNDERGRADUATE,
    college: '공과대학',
    major: '컴퓨터과학과',
    name: '데이터베이스',
    professor: '윤강석',
    times: [
      { dayOfWeek: DayOfWeek.MONDAY, startPeriod: 2, endPeriod: 4 },
      { dayOfWeek: DayOfWeek.WEDNESDAY, startPeriod: 2, endPeriod: 4 },
    ],
    classroom: '공A999',
    personnel: 20,
    credit: 3,
  },
  {
    id: 'CSI2',
    degree: Degree.UNDERGRADUATE,
    college: '공과대학',
    major: '컴퓨터과학과',
    name: '웹',
    professor: '윤강석',
    times: [
      { dayOfWeek: DayOfWeek.MONDAY, startPeriod: 2, endPeriod: 4 },
      { dayOfWeek: DayOfWeek.WEDNESDAY, startPeriod: 2, endPeriod: 4 },
    ],
    classroom: '공A999',
    personnel: 20,
    credit: 3,
  },
];
