import '@pages/default/index.css';

import { Link } from 'react-router-dom';

export default function Default() {
  return (
    <div>
      <Link to="/login">
        <div>login!</div>
      </Link>
    </div>
  );
}
