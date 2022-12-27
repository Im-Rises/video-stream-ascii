import React, {useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {getAsciiFromImage, drawTextInCanvas, drawTextInPreTag} from '../canvas-handler/video-canvas-ascii';
import './CameraPanel.css';
import myTestImage from '../res/imgs/face-logo.png';

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
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	// const canvasAsciiTextRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);
	let asciiText = 'Demo text';

	const image = new Image();
	image.src = myTestImage;
	image.onload = () => {
		const canvas = canvasVideoBufferRef.current;
		const context = canvas!.getContext('2d', {willReadFrequently: true});
		context!.drawImage(image, 0, 0, canvas!.width, canvas!.height);
	};

	useEffect(() => {
		const updateAscii = () => {
			// Init variables
			const canvas = canvasVideoBufferRef.current;
			const video = videoRef.current?.video;
			const context = canvas!.getContext('2d', {willReadFrequently: true});

			// Draw video to canvas buffer
			// context!.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
			const imageData = context!.getImageData(0, 0, canvas!.width, canvas!.height);

			// Get ascii image and draw it to canvas
			asciiText = getAsciiFromImage(imageData, asciiChars);
			// canvasAsciiTextRef.current!.getContext('2d')!.clearRect(0, 0, canvasAsciiTextRef.current!.width, canvasAsciiTextRef.current!.height);
			// drawTextInCanvas(canvasAsciiTextRef.current!, asciiText, params.fontSize, params.fontColor);

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
				<canvas ref={canvasVideoBufferRef} width={params.width} height={params.height}
					style={{width: 0, height: 0}}/>
				{/* <canvas ref={canvasAsciiTextRef} width={params.width * 10} height={params.height * 10} */}
				{/*	className={'my-canvas'}/> */}
			</div>
			<div>
				<pre ref={preTagRef} className={'my-pre'} style={{backgroundColor: params.backgroundColor}}></pre>
			</div>
		</div>
	);
};

export default CameraPanel;
