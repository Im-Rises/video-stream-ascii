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
	const [asciiText, setAsciiText] = useState('Loading...');
	const videoRef = useRef<Webcam>(null);
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);

	useEffect(() => {
		// Init variables
		const canvas = canvasVideoBufferRef.current;
		const video = videoRef.current?.video;
		const context = canvas!.getContext('2d', {willReadFrequently: true});
		calculateAndSetFontSize(preTagRef.current!, props.width, props.height, screen.width, screen.height);

		const updateAscii = () => {
			// Draw video to canvas buffer
			context!.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
			const imageData = context!.getImageData(0, 0, canvas!.width, canvas!.height);

			// Get ascii from canvas buffer and set it to the text tag
			// setAsciiText(getAsciiFromImage(imageData, asciiChars)); //TODO fix this line, that prevent camera to work
			console.log(asciiText);
		};

		setInterval(() => {
			updateAscii();
		}, props.frameRate);
	}, []);

	return (
		<div style={{backgroundColor: props.backgroundColor}} className={'holder'}>
			<Webcam ref={videoRef} style={{width: 0, height: 0}}/>
			<canvas ref={canvasVideoBufferRef} width={props.width} height={props.height}
				// style={{width: 0, height: 0}}
			/>
			<pre ref={preTagRef} style={{backgroundColor: props.backgroundColor, color: props.fontColor}}
				className={'pre-ascii'}>{asciiText}</pre>
		</div>
	);
};

export default CameraAscii;
