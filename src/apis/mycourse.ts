import axios from 'axios';

import { HOST_URL } from '@/data/url';
import { Course } from '@/interfaces/Course';

/**
 * 수강 신청
 */
interface ApplyRequest {
  courseId: string;
}

type ApplyResponse = Course[];

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
interface WithdrawRequest {
  courseId: string;
}

type WithdrawResponse = Course[];

export const withdraw = async ({
  courseId,
}: WithdrawRequest): Promise<WithdrawResponse> => {
  const response = await axios.delete<WithdrawResponse>(
    `${HOST_URL}/course/mycourse/${courseId}`,
  );

  return response.data;
};
