import React, {useRef, useEffect} from 'react';
import Webcam from 'react-webcam';
import {asciiChars} from '../constants/pixel-ascii';
import {getAsciiFromImage, drawTextInPreTag} from '../canvas-handler/video-canvas-ascii';
import './CameraAscii.css';

type Props = {
	width: number;
	height: number;
	fontColor: string;
	backgroundColor: string;
	frameRate: number;
};

const CameraAscii = (params: Props) => {
	const videoRef = useRef<Webcam>(null);
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);
	let asciiText = 'Demo text';

	// Init variables
	const canvas = canvasVideoBufferRef.current;
	const video = videoRef.current?.video;
	const context = canvas!.getContext('2d', {willReadFrequently: true});

	useEffect(() => {
		const updateAscii = () => {
			// Draw video to canvas buffer
			context!.drawImage(video!, 0, 0, canvas!.width, canvas!.height);
			const imageData = context!.getImageData(0, 0, canvas!.width, canvas!.height);

			// Get ascii image and draw it to canvas
			asciiText = getAsciiFromImage(imageData, asciiChars);

			// Print real ascii text in pre tag
			const preTag = preTagRef.current!;
			drawTextInPreTag(preTag, asciiText, params.fontSize, params.fontColor, screen.width, screen.height);
		};

		setInterval(() => {
			updateAscii();
		}, params.frameRate);
	}, []);

	return (
		<div style={{backgroundColor: params.backgroundColor}} className={'holder'}>
			<Webcam ref={videoRef} style={{width: 0, height: 0}}/>
			<canvas ref={canvasVideoBufferRef} width={params.width} height={params.height}
				style={{width: 0, height: 0}}/>
			<pre ref={preTagRef} style={{backgroundColor: params.backgroundColor}} className={'pre-ascii'}/>
		</div>
	);
};

export default CameraAscii;
