import axios from 'axios';

import { HOST_URL } from '@data/url';
import { Course } from '@interfaces/Course';

/**
 * 강의 목록 가져오기
 */
export interface GetCoursesRequest
  extends Partial<Pick<Course, 'degree' | 'college' | 'major'>> {}

export interface GetCoursesResponse extends Array<Course> {}

// GET '/course'
// 해당 API 호출이 필요한 분이 구현해주세요.
export const getCourses = async (params: GetCoursesRequest) => {
  const response = await axios.get<GetCoursesResponse>(`${HOST_URL}/course`, {
    params,
  });
  return response.data;
};

/**
 * 강의 하나 가져오기
 */
export interface GetCourseRequest extends Pick<Course, 'id'> {}

export interface GetCourseResponse extends Course {}

// GET '/course/:id'
// 해당 API 호출이 필요한 분이 구현해주세요.
export const getCourse = () => null;

/**
 * 단과대 및 전공 목록 가져오기
 */
export type GetCollegesAndMajorsRequest = void;

export interface GetCollegesAndMajorsResponse {
  colleges: string[];
  majors: string[];
}

// GET '/course/colleges-and-majors'
// 해당 API 호출이 필요한 분이 구현해주세요.
export const getCollegesAndMajors =
  async (): Promise<GetCollegesAndMajorsResponse> => {
    const response = await axios.get<GetCollegesAndMajorsResponse>(
      `${HOST_URL}/course/colleges-and-majors`,
    );

    return response.data;
  };
