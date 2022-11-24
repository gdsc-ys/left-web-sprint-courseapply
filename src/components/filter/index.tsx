import '@components/filter/index.css';

import { useEffect, useState } from 'react';

import { getCourses, getFilters } from '@apis/filter';
import { exampleFilters } from '@data/examples';
import { category, filters, filterToSend } from '@interfaces/filter';
/**
  degreeDict = {
      "학부" : ["이과대학", "공과대학", "문과대학", "상경대학", "경영대학", "생활과학대학", ...],
      "대학원" : ["음"]
    }
  departmentDict = {
    "이과대학" : ["공통", "물리학과", "수학과", "천문우주학과", "대기과학과", ...],
    "공과대학" : ["공통", "전기전자공학", "도시공학", "신소재공학과", ...],
    ...
  } 

 */

export default function Filter() {
  const [courseFilter, setCourseFilter] = useState<null | filters>(
    exampleFilters,
  );
  const [curFilter, setCurFilter] = useState<filterToSend>({
    degree: 'null',
    department: 'null',
    major: 'null',
    grade: 'null',
  });
  const [filterCategory, setFilterCategory] = useState<category>({
    degree: ['선택하세요', '학부', '대학원'],
    department: [],
    major: [],
    grade: ['1', '2', '3', '4'],
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
  return !courseFilter ? (
    <div>Loading</div>
  ) : (
    <div>
      <select
        className="degree"
        onChange={(e) => {
          const curSelected = e.target.value;
          setCurFilter({ ...curFilter, degree: curSelected });
          if (curSelected === '학부' || curSelected === '대학원') {
            const department = courseFilter.degreeDict[curSelected];
            setFilterCategory({ ...filterCategory, department: department });
          } else {
            setFilterCategory({
              ...filterCategory,
              department: [],
              major: [],
            });
          }
        }}
      >
        <option value="null">선택하세요</option>
        <option value="학부">학부</option>
        <option value="대학원">대학원</option>
      </select>
      <select
        className="department"
        onChange={(e) => {
          const curSelected = e.target.value;
          setCurFilter({ ...curFilter, department: curSelected });
          if (curSelected !== 'null') {
            const major = courseFilter.departmentDict[curSelected];
            setFilterCategory({ ...filterCategory, major: major });
          } else {
            setFilterCategory({
              ...filterCategory,
              major: [],
            });
          }
        }}
      >
        <option value="null">선택하세요</option>
        {filterCategory.department.map((name: string) => {
          return (
            <option value={`${name}`} key={`${name}`}>
              {name}
            </option>
          );
        })}
      </select>
      <select
        className="major"
        onChange={(e) => {
          const curSelected = e.target.value;
          setCurFilter({ ...curFilter, major: curSelected });
        }}
      >
        <option value="null">선택하세요</option>
        {filterCategory.major.map((name) => {
          return (
            <option value={`${name}`} key={`${name}`}>
              {name}
            </option>
          );
        })}
      </select>
      <select
        className="grade"
        onChange={(e) => {
          const curSelected = e.target.value;
          setCurFilter({ ...curFilter, grade: curSelected });
        }}
      >
        <option value="null">선택하세요</option>
        {filterCategory.grade.map((name) => {
          return (
            <option value={`${name}`} key={`${name}`}>
              {`${name}학년`}
            </option>
          );
        })}
      </select>
      <button
        type="submit"
        onClick={() => {
          getCourses(curFilter);
        }}
      ></button>
    </div>
  );
}
