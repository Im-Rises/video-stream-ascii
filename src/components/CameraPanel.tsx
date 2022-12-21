import React, {useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {getAsciiImage} from '../canvas-handler/video-canvas-ascii';
import './CameraPanel.css';

const refreshRate = 1000 / 30;

function CameraPanel() {
	const videoRef = React.createRef<Webcam>();
	const canvasRef = React.createRef<HTMLCanvasElement>();
	const asciiRef = React.createRef<HTMLPreElement>();

	useEffect(() => {
		const updateAscii = () => {
			const canvas = canvasRef.current;
			const video = videoRef.current?.video;
			const ascii = asciiRef.current;

			canvas!.width = video!.videoWidth;
			canvas!.height = video!.videoHeight;
			const context = canvas!.getContext('2d');
			context!.drawImage(video!, 0, 0);
			console.log(video!.width, video!.height);
			const imageData = context!.getImageData(0, 0, canvas!.width, canvas!.height);
			ascii!.innerText = getAsciiImage(imageData, asciiChars);
		};

		setInterval(() => {
			updateAscii();
		}, refreshRate);
	}, []);

	return (
		<div>
			<Webcam ref={videoRef} width={100} height={100}/>
			<canvas ref={canvasRef} style={{display: 'none'}}/>
			<pre ref={asciiRef} style={{}}/>
		</div>
	);
}

export default CameraPanel;
