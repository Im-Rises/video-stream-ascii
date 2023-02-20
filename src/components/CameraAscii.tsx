import React, {useRef, useEffect, useState} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {calculateAndSetFontSize, getAsciiFromImage} from '../canvas-handler/video-canvas-ascii';
import './CameraAscii.css';

type Props = {
	width: number;
	height: number;
	fontColor: string;
	backgroundColor: string;
	frameRate: number;
};

const CameraAscii = (props: Props) => {
	const [isCameraReady, setIsCameraReady] = useState(false);
	const [asciiText, setAsciiText] = useState('Loading...');
	const videoRef = useRef<Webcam>(null);
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);

	useEffect(() => {
		if (isCameraReady) {
			const canvas = canvasVideoBufferRef.current!;
			const video = videoRef.current!;
			const context = canvas.getContext('2d', {willReadFrequently: true})!;
			calculateAndSetFontSize(preTagRef.current!, props.width, props.height, screen.width, screen.height);

			const updateAscii = () => {
				// Draw video to canvas buffer
				context.drawImage(video.video!, 0, 0, canvas.width, canvas.height);
				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

				// Get ascii from canvas buffer and set it to the text tag
				const text = getAsciiFromImage(imageData, asciiChars);
				setAsciiText(text);
			};

			const intervalId = setInterval(updateAscii, props.frameRate);

			return () => {
				clearInterval(intervalId);
			};
		}
	}, [isCameraReady]);

	const handleUserMedia = (stream: MediaStream) => {
		const video = videoRef.current!.video!;
		video.srcObject = stream;
		video.onloadedmetadata = async () => {
			await video.play();
			setIsCameraReady(true);
		};
	};

	return (
		<div style={{backgroundColor: props.backgroundColor}} className={'holder'}>
			<Webcam ref={videoRef}
				style={{width: 0, height: 0}}
				onUserMedia={handleUserMedia}
			/>
			{/* {isCameraReady && ( */}
			{/*	<> */}
			<canvas ref={canvasVideoBufferRef} width={props.width} height={props.height}
				style={{display: 'none'}}/>
			<pre ref={preTagRef} style={{backgroundColor: props.backgroundColor, color: props.fontColor}}
				className={'pre-ascii'}>
				{asciiText}
			</pre>
			{/* </> */}
			{/* )} */}
		</div>
	);
};

export default CameraAscii;
