import React, {useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {getAsciiImage} from '../canvas-handler/video-canvas-ascii';
import './CameraPanel.css';

function CameraPanel() {
	const refreshRate = 1000 / 30;
	const videoRef = React.createRef<Webcam>();
	const canvasRef = React.createRef<HTMLCanvasElement>();
	const asciiRef = React.createRef<HTMLPreElement>();

	useEffect(() => {
		const updateAscii = () => {
			const canvas = canvasRef.current;
			const video = videoRef.current?.video;
			const ascii = asciiRef.current;

			const context = canvas!.getContext('2d');
			context!.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
			const imageData = context!.getImageData(0, 0, canvas!.width, canvas!.height);
			ascii!.innerText = getAsciiImage(imageData, asciiChars);
		};

		setInterval(() => {
			updateAscii();
		}, refreshRate);
	}, []);

	return (
		<div>
			<Webcam ref={videoRef} style={{width: 0, height: 0}}/>
			<canvas ref={canvasRef} width={200} height={200}/>
			<pre ref={asciiRef} style={{}}/>
		</div>
	);
}

export default CameraPanel;
