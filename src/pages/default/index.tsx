import '@pages/default/index.css';

import { Link } from 'react-router-dom';

export default function Default() {
  return (
    <div>
      <Link to="/main">
        <div>main!</div>
      </Link>
    </div>
  );
}
