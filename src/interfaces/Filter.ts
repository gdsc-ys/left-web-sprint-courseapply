import { Degree, Course } from '@interfaces/Course';

export interface FilterProps {
  setCourses: (courses: Course[]) => void;
}

export enum CategoryPick {
  PICK = '',
}

export interface Category {
  degree: Array<CategoryPick | Degree>;
  college: string[];
  major: string[];
}

export interface DegreeDict {
  [key: string]: string[];
}

export interface CollegeDict {
  [key: string]: string[];
}

export interface Filters {
  degreeDict: DegreeDict;
  collegeDict: CollegeDict;
}

export interface FilterToSend
  extends Partial<Pick<Course, 'degree' | 'college' | 'major'>> {}
