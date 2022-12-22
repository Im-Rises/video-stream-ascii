import React, {useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {getAsciiImage, drawTextInCanvas} from '../canvas-handler/video-canvas-ascii';
import './CameraPanel.css';

function CameraPanel() {
	const refreshRate = 1000 / 30;
	const videoRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const asciiTextRef = useRef<HTMLCanvasElement>(null);
	let asciiText = 'Demo text';

	useEffect(() => {
		const updateAscii = () => {
			// Init variables
			const canvas = canvasRef.current;
			const video = videoRef.current?.video;
			const context = canvas!.getContext('2d', {willReadFrequently: true});

			// Draw video to canvas buffer
			context!.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
			const imageData = context!.getImageData(0, 0, canvas!.width, canvas!.height);

			// Get ascii image and draw it to canvas
			asciiText = getAsciiImage(imageData, asciiChars);
			asciiTextRef.current!.getContext('2d')!.clearRect(0, 0, asciiTextRef.current!.width, asciiTextRef.current!.height);
			drawTextInCanvas(asciiTextRef.current!, asciiText, 16);
		};

		setInterval(() => {
			updateAscii();
		}, refreshRate);
	}, []);

	return (
		<div style={{backgroundColor: 'black'}}>
			<Webcam ref={videoRef} style={{width: 0, height: 0}}/>
			<canvas ref={canvasRef} width={200} height={200}/>
			<canvas ref={asciiTextRef} width={2000} height={2000}/>
		</div>
	);
}

export default CameraPanel;
