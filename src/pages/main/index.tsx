import * as React from 'react';
import './index.css';
import { useEffect, useState } from 'react';
import Header from '@components/header';
import Filter from '@components/filter';
import Courses from '@components/courses';
import Basket from '@components/basket';
import { courseExample } from '@data/examples';
import { dataServices } from '@services/dataServices';
import { classTime, CourseData } from '@type/index';

//
async function getData(
	setLoadingToGetData: (value: boolean) => void,
	setCourseData: (value: Array<CourseData>) => void
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
	const [courseData, setCourseData] = useState<Array<CourseData>>([courseExample]);
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
