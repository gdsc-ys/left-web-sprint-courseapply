type classTime = Array<{ day: string; start: string; end: string }>;

type CourseData = {
  college: string;
  courseName: string;
  courseCode: string;
  professor: string;
  //음...
  time: classTime;
  classRoom: string;
  personel: number;
  credit: number; //학점
};
export const courseExample: CourseData = {
  college: '공과대학',
  courseName: '데이터베이스',
  courseCode: 'ABCDEf',
  professor: '강민서',
  //걍 Object로 관리할까요? ex [["화" , {start : 1, end : 2}], ["수" , {start : 1, end : 2}]]
  time: [
    { day: '화', start: '2', end: '4' },
    { day: '수', start: '2', end: '4' },
  ],
  classRoom: '공A999',
  personel: 2000,
  credit: 3, //학점
};
