import '@components/courses/index.css';

import { courses } from '@/data/examples';
import { useState } from 'react';

export default function Courses() {
  const [courseId, setCourseID] = useState('');
  const handleClick = (param: string) => {
    setCourseID(param);
  };
  return (
    <div>
      <span>CSI1</span>
      <button onClick={() => handleClick('CSI1')}>To Cart</button>
      <br />
      <span>CSI2</span>
      <button onClick={() => handleClick('CSI2')}>To Cart</button>
    </div>
  );
}
