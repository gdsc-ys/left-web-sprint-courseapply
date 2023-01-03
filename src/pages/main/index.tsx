import '@pages/main/index.css';

import { useCallback, useEffect, useState } from 'react';

import { getCourses as getCourse } from '@apis/course';
import { getAppliedCourses as getAppliedCourse } from '@apis/mycourse';
import Apply from '@components/apply';
import Basket from '@components/basket';
import Courses from '@components/courses';
import Filter from '@components/filter';
import Header from '@components/header';
import { courses as courseExample } from '@data/examples';
import { Course } from '@interfaces/Course';

export default function Main() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [preferredCourses, setPreferredCourses] = useState<Course['id'][]>();
  const [appliedCourses, setAppliedCourses] = useState<Course[]>([]);

  const getAppliedCourses = useCallback(async () => {
    const courses = await getAppliedCourse();

    setAppliedCourses(courses);
  }, []);

  useEffect(() => {
    getAppliedCourses();
  }, []);

  const savedBasket = JSON.parse(localStorage.getItem('basket') ?? '[]');

  const [basket, setBasket] = useState<string[]>(savedBasket);

  const handleAddBasket = (courseId: string) => {
    const duplicatedCourse = basket.find((course) => course === courseId);

    if (duplicatedCourse) {
      alert('이미 존재하는 강의입니다');
      return;
    }

    const newBasket = [...basket, courseId];
    localStorage.setItem('basket', JSON.stringify(newBasket));
    setBasket(newBasket);
  };

  return (
    <div>
      <Header />
      {courses ? (
        <>
          <Filter setCourses={setCourses} />
          <Courses handleAddBasket={handleAddBasket} />
          <Basket
            basket={basket}
            setBasket={setBasket}
            setAppliedCourses={setAppliedCourses}
          />
          <Apply
            appliedCourses={appliedCourses}
            setAppliedCourses={setAppliedCourses}
          ></Apply>
        </>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
}
