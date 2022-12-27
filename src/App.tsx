import React, {useEffect} from 'react';
import './App.css';
import CameraAscii from './components/CameraAscii';

const App = () => (
	<div className='App'>
		<CameraAscii frameRate={1000 / 30} width={200} height={200} fontSize={16} fontColor={'white'}
                     backgroundColor={'black'}/>
	</div>
);

export default App;
