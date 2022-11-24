import '@components/courses/index.css';

import { courses } from '@/data/examples';

export default function Courses() {
  const courseHandler = (id: string) => {
    const index = courses.findIndex((element) => element.id == id);
    console.log(courses[index]);
    module.exports = id;
  };
  return (
    <div>
      <span>CSI1</span>
      <button onClick={() => courseHandler('CSI1')}>To Cart</button>
      <br />
      <span>CSI2</span>
      <button onClick={() => courseHandler('CSI2')}>To Cart</button>
    </div>
  );
}
