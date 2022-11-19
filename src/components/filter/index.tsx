import * as React from 'react';
import { useEffect, useState } from 'react';
import './index.css';

/**
  degreeDict = {
      "학부" : ["이과대학", "공과대학", "문과대학", "상경대학", "경영대학", "생활과학대학"],
      "대학원" : ["음"]
    }
  departmentDict = {
    "이과대학" : ["공통", "물리학과", "수학과", "천문우주학과", "대기과학과", ...],
    "공과대학" : ["공통", "전기전자공학", "도시공학", "신소재공학과", ...],
    ...
  } 

 */

function setSelectValue() {

}

export default function Filter() {
	const [curFilter, setCurFilter] = useState({
		degree: '',
		department: '',
		major: '',
		grade: '',
	});

	const [filterCategory, setFilterCategory] = useState({});

	return (
		<div>
			<select className="degree"
      onChange = {(e) => {
        
      }}>
				<option value="null">선택하세요</option>
				<option value="학부">학부</option>
				<option value="대학원">대학원</option>
			</select>
			<select className="department">{}</select>
			<select className="major"></select>
			<select className="grade">
				<option value="1">1학년</option>
				<option value="2">2학년</option>
				<option value="3">3학년</option>
				<option value="4">4학년</option>
			</select>
		</div>
	);
}
