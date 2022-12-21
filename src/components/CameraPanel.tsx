import React, {useEffect} from 'react';
import Webcam from 'react-webcam';

// Refresh rate of the camera in milliseconds
const refreshRate: number = 1000 / 30;

// Webcam variables
const webcamRef = React.createRef<Webcam>();

// Video Canvas variables
const videoCanvasRef = React.createRef<HTMLCanvasElement>();
const videoCanvasId = 'videoCanvas';
const videoWidth = 640;
const videoHeight = 480;

// ASCII Canvas variables
const asciiCanvasRef = React.createRef<HTMLCanvasElement>();
const asciiCanvasId = 'asciiCanvas';

function CameraPanel() {
	useEffect(() => {
		const video = webcamRef.current?.video;
		const videoCanvas = videoCanvasRef.current;
		const videoCanvasCtx = videoCanvas!.getContext('2d');
		const asciiCanvas = asciiCanvasRef.current;
		const asciiCanvasCtx = asciiCanvas!.getContext('2d');
		// VideoCanvasCtx!.fillText('Hello world', 50, 90);
		setInterval(() => {
			videoCanvasCtx!.drawImage(video!, 0, 0, videoWidth, videoHeight);
			// AsciiCanvasCtx!.drawImage(videoCanvas!, 0, 0, videoWidth, videoHeight);
			asciiCanvasCtx!.fillText('Hello world', 50, 90);
		}, refreshRate);
	});

	return (
		<div>
			<Webcam ref={webcamRef} style={{width: 0, height: 0}}/>
			<canvas ref={videoCanvasRef} id={videoCanvasId} width={videoWidth} height={videoHeight}/>
			<canvas ref={asciiCanvasRef} id={asciiCanvasId} width={videoWidth} height={videoHeight}/>
		</div>
	);
}

export default CameraPanel;
