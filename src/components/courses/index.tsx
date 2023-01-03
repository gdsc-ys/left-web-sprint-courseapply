import '@components/courses/index.css';

interface Props {
  handleAddBasket: (courseId: string) => void;
}

export default function Courses({ handleAddBasket }: Props) {
  return (
    <div>
      <span>CSI1</span>
      <button onClick={() => handleAddBasket('CSI1')}>To Cart</button>
      <br />
      <span>CSI2</span>
      <button onClick={() => handleAddBasket('CSI2')}>To Cart</button>
    </div>
  );
}
