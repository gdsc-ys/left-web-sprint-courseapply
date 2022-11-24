import axios from 'axios';

import { HOST_URL } from '@/data/url';
import { filters, filterToSend } from '@/interfaces/filter';
import { Course } from '@/interfaces/Course';

/**
 * 필터링 목록 받기
 */
export const getFilters = async (): Promise<filters> => {
  const response = await axios.get(`${HOST_URL}`);
  return response.data;
};

/**
 * 필터에 맞는 강의 받아오기
 */


export const getCourses = async (
  curFilter : filterToSend,
): Promise<Course[]> => {
  const keys  = Object.keys(curFilter) as Array<keyof typeof curFilter>
  keys.forEach((key) => {
    if (curFilter[key] === 'null') {
        return null
    }
  })
  const response = await axios.get<Course[]>(`${HOST_URL}/course`, {
    params: { curFilter },
  });
  return response.data;
};
