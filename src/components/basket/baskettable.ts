import { Degree } from '@/interfaces/Course';
import { CourseForTable } from '@/interfaces/Table';

export interface CourseForBasketTable extends CourseForTable {
  select: object;
  id: string; // 학정번호

  name: string; // 과목명
  degree: Degree; // 학위
  college: string; // 단과대
  major: string; // 전공
  professor: string; // 교수님
  times: string; // 수업 시간
  classroom: string; // 강의실
  personnel: number; // 정원
  credit: number; //학점
  apply: object;
  delete: object;
}
