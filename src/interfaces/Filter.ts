import { Degree, Course } from '@interfaces/Course';

export interface FilterProps {
  setCourses: (courses: Course[]) => void;
}

export enum CategoryPick {
  PICK = '',
}

export interface Category {
  degree: Array<CategoryPick | Degree>;
  colleges: string[];
  majors: string[];
}
/** 
export interface DegreeDict {
  [key: string]: string[];
}

export interface CollegeDict {
  [key: string]: string[];
}
*/
export interface Filters {
  majors: string[];
  colleges: string[];
}

export interface FilterToSend
  extends Partial<Pick<Course, 'degree' | 'college' | 'major'>> {}
