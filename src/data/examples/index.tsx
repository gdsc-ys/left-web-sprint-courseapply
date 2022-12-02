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

const degreeDict = {
  학부: ['이과대학', '공과대학'],
  대학원: ['음'],
};
const collegeDict = {
  이과대학: ['공통', '물리학과', '수학과', '천문우주학과', '대기과학과'],
  공과대학: ['공통', '전기전자공학', '도시공학', '신소재공학과'],
};

export const exampleFilters = {
  degreeDict: degreeDict,
  collegeDict: collegeDict,
};
