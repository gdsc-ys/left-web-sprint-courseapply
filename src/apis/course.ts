import { Course } from '@/interfaces/Course';

/**
 * 강의 목록 가져오기
 */
export interface GetCoursesRequest
  extends Partial<Pick<Course, 'degree' | 'college' | 'major'>> {}

export interface GetCoursesResponse extends Array<Course> {}

/**
 * 강의 하나 가져오기
 */
export interface GetCourseRequest extends Pick<Course, 'id'> {}

export interface GetCourseResponse extends Course {}

/**
 * 단과대 및 전공 목록 가져오기
 */
export type GetCollegesAndMajorsRequest = void;

export interface GetCollegesAndMajorsResponse {
  colleges: string[];
  majors: string[];
}
