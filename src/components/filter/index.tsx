import '@components/filter/index.css';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { getCourses } from '@apis/course';
import { exampleFilters } from '@data/examples';
import { Course, Degree } from '@interfaces/Course';
import {
  CategoryPick,
  FilterProps,
  Category,
  Filters,
  FilterToSend,
} from '@interfaces/Filter';

import { SlMagnifier } from 'react-icons/sl';
/**
  degreeDict = {
      "학부" : ["이과대학", "공과대학", "문과대학", "상경대학", "경영대학", "생활과학대학", ...],
      "대학원" : ["음"]
    }
  collegeDict = {
    "이과대학" : ["공통", "물리학과", "수학과", "천문우주학과", "대기과학과", ...],
    "공과대학" : ["공통", "전기전자공학", "도시공학", "신소재공학과", ...],
    ...
  } 

 */

export default function Filter({ setCourses }: FilterProps) {
  const [courseFilter, setCourseFilter] = useState<null | Filters>(
    exampleFilters,
  );
  const [curFilter, setCurFilter] = useState<FilterToSend>({
    degree: undefined,
    college: undefined,
    major: undefined,
  });
  const [filterCategory, setFilterCategory] = useState<Category>({
    degree: [CategoryPick.PICK, Degree.GRADUATE, Degree.UNDERGRADUATE],
    college: [],
    major: [],
  });
  /** 이 부분 useMemo 로 처리하고 싶은데 안되네요 */
  /** 
  useEffect(() => {
    async function setFilter(): Promise<void> {
      const response = await getFilters();
      setCourseFilter(response);
    }
    setFilter();
  }, []);
*/
  console.log(filterCategory.degree);

  return !courseFilter ? (
    <div>Loading</div>
  ) : (
    <div className="filter">
      <select
        className="degree select"
        onChange={(e) => {
          const curSelected = e.target.value as CategoryPick | Degree;
          if (curSelected === '학부' || curSelected === '대학원') {
            setCurFilter({ ...curFilter, degree: curSelected });
            const college = courseFilter.degreeDict[curSelected];
            setFilterCategory({ ...filterCategory, college: college });
          } else {
            setCurFilter({ ...curFilter, degree: undefined });
            setFilterCategory({
              ...filterCategory,
              college: [],
              major: [],
            });
          }
        }}
      >
        <option value={CategoryPick.PICK}>학위</option>
        <option value={Degree.UNDERGRADUATE}>학부</option>
        <option value={Degree.GRADUATE}>대학원</option>
      </select>
      <select
        className="college select"
        onChange={(e) => {
          const curSelected = e.target.value;
          setCurFilter({ ...curFilter, college: curSelected });
          if (curSelected !== 'null') {
            const major = courseFilter.collegeDict[curSelected];
            setFilterCategory({ ...filterCategory, major: major });
          } else {
            setFilterCategory({
              ...filterCategory,
              major: [],
            });
          }
        }}
      >
        <option value="null">대학</option>
        {filterCategory.college.map((name: string) => {
          return (
            <option value={`${name}`} key={`${name}`}>
              {name}
            </option>
          );
        })}
      </select>
      <select
        className="major select"
        onChange={(e) => {
          const curSelected = e.target.value;
          setCurFilter({ ...curFilter, major: curSelected });
        }}
      >
        <option value="null">학과</option>
        {filterCategory.major.map((name) => {
          return (
            <option value={`${name}`} key={`${name}`}>
              {name}
            </option>
          );
        })}
      </select>
      <button
        className="request-course"
        type="submit"
        onClick={async () => {
          const response = await getCourses(curFilter);
          if (response === null) {
            alert('rerererere');
          }
          setCourses(response);
        }}
      >
        <SlMagnifier />
      </button>
    </div>
  );
}
