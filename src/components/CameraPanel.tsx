import React, {useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {getAsciiImage, drawTextInCanvas} from '../canvas-handler/video-canvas-ascii';
import './CameraPanel.css';

const inputVideoWidth = 200;
const inputVideoHeight = 200;

const outputCanvasWidth = 200;
const outputCanvasHeight = 200;

function CameraPanel() {
	const refreshRate = 1000 / 30;
	const videoRef = useRef<Webcam>(null);
	const canvasBufferRef = useRef<HTMLCanvasElement>(null);
	const asciiTextCanvasRef = useRef<HTMLCanvasElement>(null);
	let asciiText = 'Demo text';

	useEffect(() => {
		const updateAscii = () => {
			const video = videoRef.current?.video;
			const canvasBuffer = canvasBufferRef.current;
			const asciiTextCanvas = asciiTextCanvasRef.current;
			const asciiTextCanvasContext = asciiTextCanvas?.getContext('2d');

			// Fill canvas buffer with video frame
			const context = canvasBuffer!.getContext('2d', {willReadFrequently: true});
			context!.drawImage(video!, 0, 0, canvasBuffer!.width, canvasBuffer!.height);

			// Convert canvas buffer to ascii text
			const imageData = context!.getImageData(0, 0, canvasBuffer!.width, canvasBuffer!.height);
			asciiText = getAsciiImage(imageData, asciiChars);

			// Draw ascii text in canvas
			asciiTextCanvasContext!.clearRect(0, 0, asciiTextCanvasRef.current!.width, asciiTextCanvasRef.current!.height);
			drawTextInCanvas(asciiTextCanvasRef.current!, asciiText, 16);
		};

		setInterval(() => {
			updateAscii();
		}, refreshRate);
	}, []);

	return (
		<div style={{backgroundColor: 'black'}}>
			<Webcam ref={videoRef} style={{width: 0, height: 0}}/>
			<canvas ref={canvasBufferRef} width={inputVideoWidth} height={inputVideoHeight}/>
			<canvas ref={asciiTextCanvasRef} width={outputCanvasWidth} height={outputCanvasHeight}/>
		</div>
	);
}

export default CameraPanel;
