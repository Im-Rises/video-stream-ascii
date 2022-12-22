import React from 'react';
// Import logo from './logo.svg';
import './App.css';
import CameraPanel from './components/CameraPanel';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<CameraPanel width={200} height={200} fontSize={16} fontColor='white' backgroundColor='black'/>
			</header>
		</div>
	);
}

export default App;
