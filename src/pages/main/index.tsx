import '@pages/main/index.css';

import { useCallback, useEffect, useState } from 'react';

import { Course } from '@/interfaces/Course';
import Basket from '@components/basket';
import Courses from '@components/courses';
import Filter from '@components/filter';
import Header from '@components/header';
import { courses as courseExample } from '@data/examples';

export default function Main() {
  const [courses, setCourses] = useState<Course[]>();

  const getCourses = useCallback(async () => {
    setCourses(undefined);

    const courses = courseExample;

    setCourses(courses);
  }, []);

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <Header />
      {courses ? (
        <>
          <Filter setCourses={setCourses} />
          <Courses />
          <Basket />
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
