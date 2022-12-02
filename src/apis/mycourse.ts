import axios from 'axios';

import { HOST_URL } from '@data/url';
import { Course } from '@interfaces/Course';
/**
 * 수강 신청
 */
export interface ApplyRequest extends Pick<Course, 'id'> {}

export type ApplyResponse = Course[];

export const apply = async (course: ApplyRequest): Promise<ApplyResponse> => {
  const response = await axios.post<ApplyResponse>(
    `${HOST_URL}/course/mycourse`,
    course,
  );

  return response.data;
};

/**
 * 수강 취소
 */
export interface WithdrawRequest extends Pick<Course, 'id'> {}

export type WithdrawResponse = Course[];

export const withdraw = async ({
  id,
}: WithdrawRequest): Promise<WithdrawResponse> => {
  const response = await axios.delete<WithdrawResponse>(
    `${HOST_URL}/course/mycourse/${id}`,
  );

  return response.data;
};

/**
 * 신청 내역 List
 */
export type GetAppliedCoursesRequest = void;

export interface GetAppliedCoursesResponse extends Array<Course> {}

// GET /course/mycourse
// 해당 API 호출이 필요한 분이 구현해주세요.
export const getAppliedCourses = () => null;
