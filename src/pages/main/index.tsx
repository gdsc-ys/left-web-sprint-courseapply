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
      <Filter />
      <Courses handleAddBasket={handleAddBasket} />
      <Basket basket={basket} />
      {!courseData && <div>loading...</div>}
    </div>
  );
}
