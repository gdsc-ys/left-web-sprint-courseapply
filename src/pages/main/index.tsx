import '@pages/main/index.css';

import { useState } from 'react';

import Basket from '@components/basket';
import Courses from '@components/courses';
import Filter from '@components/filter';
import Header from '@components/header';
import { courseExample } from '@data/examples';
import { dataServices } from '@services/dataServices';
import { CourseData } from '@type/index';

async function getData(
  setLoadingToGetData: (value: boolean) => void,
  setCourseData: (value: Array<CourseData>) => void,
) {
  setLoadingToGetData(true);
  try {
    const response: any = await dataServices.getData();
    setCourseData(response);
  } catch (e) {
    Error();
  } finally {
    setLoadingToGetData(false);
  }
}

export default function Main() {
  const [courseData, setCourseData] = useState<Array<CourseData>>([
    courseExample,
  ]);
  const [loadingToGetData, setLoadingToGetData] = useState<boolean>(false);
  const [loadingToApply, setLoadingToApply] = useState<boolean>(false);
  return (
    <div>
      <Header />
      <Filter />
      <Courses />
      <Basket />
    </div>
  );
}
