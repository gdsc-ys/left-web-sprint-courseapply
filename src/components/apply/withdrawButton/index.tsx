import '@components/apply/withdrawButton/index.css';

import { withdraw } from '@apis/mycourse';
import { Course } from '@interfaces/Course';
import { CourseForTable } from '@interfaces/Table';

export default function WithdrawButton({
  coursesForTable,
  setAppliedCourses,
}: {
  coursesForTable: CourseForTable;
  setAppliedCourses: (appliedCourses: Course[]) => void;
}) {
  return (
    <button
      className="withdraw-button"
      onClick={async () => {
        const response = await withdraw({ id: coursesForTable.id });
        setAppliedCourses(response);
      }}
      style={{ backgroundColor: 'none' }}
    >
      취소
    </button>
  );
}
