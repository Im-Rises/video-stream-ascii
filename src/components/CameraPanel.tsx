import React, {useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {getAsciiFromImage, drawTextInCanvas, drawTextInPreTag} from '../canvas-handler/video-canvas-ascii';
import './CameraPanel.css';

type Params = {
	width: number;
	height: number;
	fontSize: number;
	fontColor: string;
	backgroundColor: string;
	frameRate: number;
};

const CameraPanel = (params: Params) => {
	const videoRef = useRef<Webcam>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const asciiTextRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);
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
			asciiText = getAsciiFromImage(imageData, asciiChars);
			asciiTextRef.current!.getContext('2d')!.clearRect(0, 0, asciiTextRef.current!.width, asciiTextRef.current!.height);
			drawTextInCanvas(asciiTextRef.current!, asciiText, params.fontSize, params.fontColor);

			// Print real ascii text in pre tag
			const preTag = preTagRef.current!;
			// preTag.innerHTML = asciiText;
			drawTextInPreTag(preTag, asciiText, params.fontSize, params.fontColor, screen.width);
		};

		setInterval(() => {
			updateAscii();
		}, params.frameRate);
	}, []);

	return (
		<div>
			<div style={{backgroundColor: params.backgroundColor}} className={'holder'}>
				<Webcam ref={videoRef} style={{width: 0, height: 0}}/>
				<canvas ref={canvasRef} width={params.width} height={params.height} style={{width: 0, height: 0}}/>
				<canvas ref={asciiTextRef} width={params.width * 10} height={params.height * 10}
					className={'my-canvas'}/>
			</div>
			<div>
				<pre ref={preTagRef} className={'my-pre'} style={{backgroundColor: params.backgroundColor}}></pre>
			</div>
		</div>
	);
};

export default CameraPanel;
