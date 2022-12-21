import React, {useEffect} from 'react';
import './CameraPanel.css';
import Webcam from 'react-webcam';
import convertVideoToAscii from '../canvas-handler/video-canvas-ascii';
import {asciiArray} from '../constants/pixel-ascii';

// Refresh rate of the camera in milliseconds
const refreshRate = 1000;
const videoWidth = 640;
const videoHeight = 480;
const asciiVideoWidth = 160;
const asciiVideoHeight = 120;
const fontSize = videoHeight / asciiVideoHeight;

// Webcam variables
const webcamRef = React.createRef<Webcam>();

// Video Canvas variables
const videoCanvasRef = React.createRef<HTMLCanvasElement>();
const videoCanvasId = 'videoCanvas';

// ASCII Canvas variables
const asciiCanvasRef = React.createRef<HTMLCanvasElement>();
const asciiCanvasId = 'asciiCanvas';

function CameraPanel() {
	useEffect(() => {
		const video = webcamRef.current?.video;
		const videoCanvas = videoCanvasRef.current;
		const videoCanvasCtx = videoCanvas!.getContext('2d', {willReadFrequently: true});
		const asciiCanvas = asciiCanvasRef.current;
		const asciiCanvasCtx = asciiCanvas!.getContext('2d');
		// asciiCanvasCtx!.fillStyle = 'black'; // Set the background color of the canvas (by default it's black)
		setInterval(() => {
			videoCanvasCtx!.drawImage(video!, 0, 0, videoWidth, videoHeight);
			asciiCanvasCtx!.clearRect(0, 0, videoWidth, videoHeight);
			convertVideoToAscii(videoCanvas!, asciiCanvas!, asciiArray);
		}, refreshRate);
	});

	return (
		<div>
			<Webcam ref={webcamRef} style={{width: 0, height: 0}}/>
			<canvas ref={videoCanvasRef} id={videoCanvasId} width={videoWidth} height={videoHeight}
				className={'my-canvas'}/>
			<canvas ref={asciiCanvasRef} id={asciiCanvasId} width={asciiVideoWidth} height={asciiVideoHeight}
				className={'my-canvas'}/>
		</div>
	);
}

export default CameraPanel;
