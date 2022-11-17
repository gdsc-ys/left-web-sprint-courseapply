import * as React from 'react'
import './index.css'
import { useEffect, useState } from 'react'
import Header from '@components/header'
import { courseExample } from '@data/examples'
import { dataServices } from '@services/dataServices'

type classTime = Array<{ day: string; start: string; end: string }>

// 받아올 강의 데이터 type, (interface 로 바꿀게요)
interface CourseData {
  college: string
  courseName: string
  courseCode: string
  professor: string
  //음...
  time: classTime
  //[{요일 : 화, 시작 : 1, 끝 : 2}, {}]
  classRoom: string
  personel: number
  credit: number //학점
}

//
async function getData(
  setLoadingToGetData: (value: boolean) => void,
  setCourseData: (value: Array<CourseData>) => void,
) {
  setLoadingToGetData(true)
  try {
    const response: any = await dataServices.getData()
    setCourseData(response)
  } catch (e) {
    Error()
  } finally {
    setLoadingToGetData(false)
  }
}

export default function Main() {
  const [courseData, setCourseData] = useState<Array<CourseData>>([
    courseExample,
  ])
  const [loadingToGetData, setLoadingToGetData] = useState<boolean>(false)
  return (
    <div>
      <Header />
    </div>
  )
}
