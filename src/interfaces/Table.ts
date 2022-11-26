import { Course } from '@interfaces/Course';

export interface CourseForTable extends Omit<Course, 'times'> {
  times: string;
}
