import React, {useEffect} from 'react';
import './App.css';
import CameraPanel from './components/CameraPanel';
import Webcam from 'react-webcam';

const App = () => {
	const refreshRate = 1000 / 30;
	const videoRef = React.useRef<Webcam>(null);
	const canvasVideoBufferRef = React.useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const updateCanvasVideoBuffer = () => {
			// Init variables
			const canvas = canvasVideoBufferRef.current!;
			const video = videoRef.current?.video;
			const context = canvas.getContext('2d', {willReadFrequently: true});

			// Draw video to canvas buffer
			context!.drawImage(video!, 0, 0, canvas.width, canvas.height);
		};

		setInterval(() => {
			updateCanvasVideoBuffer();
		}, refreshRate);
	}, []);

	return (
		<div className='App'>
			<header className='App-header'>
				<Webcam ref={videoRef} style={{width: 0, height: 0}}/>
				<canvas ref={canvasVideoBufferRef} width={640} height={480}/>
				<CameraPanel width={200} height={200} fontSize={16} fontColor='white' backgroundColor='black'/>
			</header>
		</div>
	);
};

export default App;
