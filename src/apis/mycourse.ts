import axios from 'axios';

import { HOST_URL } from '@/data/url';
import { Course } from '@/interfaces/Course';

/**
 * 신청 내역
 */
export type GetAppliedCoursesRequest = void;

export interface GetAppliedCoursesResponse extends Array<Course> {}

/**
 * 수강 신청
 */
export interface ApplyRequest {
  courseId: string;
}

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
export interface WithdrawRequest {
  courseId: string;
}

export type WithdrawResponse = Course[];

export const withdraw = async ({
  courseId,
}: WithdrawRequest): Promise<WithdrawResponse> => {
  const response = await axios.delete<WithdrawResponse>(
    `${HOST_URL}/course/mycourse/${courseId}`,
  );

  return response.data;
};
