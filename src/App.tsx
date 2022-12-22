import React, {useEffect} from 'react';
import './App.css';
import CameraPanel from './components/CameraPanel';
import Webcam from 'react-webcam';

const App = () => (
	<div className='App'>
		<header className='App-header'>
			<CameraPanel width={200} height={200} fontSize={16} fontColor='white' backgroundColor='black'/>
		</header>
	</div>
);

export default App;
