import '@pages/main/index.css';

import { useCallback, useEffect, useState } from 'react';

import Apply from '@components/apply';
import Basket from '@components/basket';
import Courses from '@components/courses';
import Filter from '@components/filter';
import Header from '@components/header';
import { courses as courseExample } from '@data/examples';
import { Course } from '@interfaces/Course';

export default function Main() {
  const [courses, setCourses] = useState<Course[]>();
  const [preferredCourses, setPreferredCourses] = useState<Course['id'][]>();
  const [appliedCourses, setAppliedCourses] = useState<Course[]>([]);

  const getCourses = useCallback(async () => {
    setCourses(undefined);

    const courses = courseExample;

    setCourses(courses);
    setAppliedCourses(courses);
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
          <Apply
            appliedCourses={appliedCourses}
            setAppliedCourses={setAppliedCourses}
          />
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
