import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Default from '@pages/default';
import Login from '@pages/login';
import Main from '@pages/main';

import './App.css';

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
