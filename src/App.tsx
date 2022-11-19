import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Default from '@pages/default';
import Login from '@pages/login';
import Main from '@pages/main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Default />} />
      </Routes>
    </Router>
  );
}

export default App;
