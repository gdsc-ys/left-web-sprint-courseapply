import '@pages/main/index.css';

import { useCallback, useEffect, useState } from 'react';

import { Course } from '@/interfaces/Course';
import Basket from '@components/basket';
import Courses from '@components/courses';
import Filter from '@components/filter';
import Header from '@components/header';
import { courses as courseExample } from '@data/examples';

export default function Main() {
  const [courseData, setCourseData] = useState<Course[]>();
  // const [loadingToGetData, setLoadingToGetData] = useState<boolean>(false);
  // const [loadingToApply, setLoadingToApply] = useState<boolean>(false);

  const getCourses = useCallback(async () => {
    setCourseData(undefined);

    const courses = courseExample;

    setCourseData(courses);
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <Header />
      <Filter />
      <Courses />
      <Basket />
      {!courseData && <div>loading...</div>}
    </div>
  );
}
