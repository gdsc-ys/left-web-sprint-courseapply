type CourseData = {
  college: String,
  courseName: String,
  courseCode: String,
  professor: String,
  //음...
  time: Array<[string, string]>,
  classRoom : String,
  personel : Number,
  credit: Number, //학점
}
export const courseExample : CourseData = 
    {
        college: "공과대학",
        courseName: "데이터베이스",
        courseCode: "ABCDEf",
        professor: "강민서",
        //걍 Object로 관리할까요? ex [["화" , {start : 1, end : 2}], ["수" , {start : 1, end : 2}]]
        time: [["화", "1,2"], ["수", "1,2"]],
        classRoom : "공A999",
        personel : 2000,
        credit: 3, //학점
      }
