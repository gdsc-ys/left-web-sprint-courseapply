export type classTime = Array<{ day: string; start: string; end: string }>;

export interface CourseData {
  college: string;
  courseName: string;
  courseCode: string;
  professor: string;
  //음...
  time: classTime;
  //[{요일 : 화, 시작 : 1, 끝 : 2}, {}]
  classRoom: string;
  personel: number;
  credit: number; //학점
}
