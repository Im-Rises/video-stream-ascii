import React, {useRef, useEffect, useState} from 'react';
import {asciiChars} from '../constants/pixel-ascii';
import {calculateAndSetFontSize, getAsciiFromImage} from '../canvas-handler/video-canvas-ascii';
// import './VideoAscii.css';

type Props = {
	videoStreaming: HTMLVideoElement;
	width: number;
	height: number;
	frameRate: number;
	fontColor: string;
	backgroundColor: string;
};

const VideoAscii = (props: Props) => {
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = useRef<HTMLPreElement>(null);

	const [asciiText, setAsciiText] = useState('');

	useEffect(() => {
		const canvas = canvasVideoBufferRef.current!;
		const context = canvas.getContext('2d', {willReadFrequently: true})!;
		calculateAndSetFontSize(preTagRef.current!, props.width, props.height, screen.width, screen.height);

		const updateAscii = () => {
			// Draw video to canvas buffer
			context.drawImage(props.videoStreaming, 0, 0, canvas.width, canvas.height);
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

			// Get ascii from canvas buffer and set it to the text tag
			const text = getAsciiFromImage(imageData, asciiChars);
			setAsciiText(text);
		};

		const intervalId = setInterval(updateAscii, props.frameRate);

		return () => {
			clearInterval(intervalId);
		};
	}, [props.videoStreaming, props.width, props.height, props.frameRate]);

	return (
		<div style={{
			backgroundColor: props.backgroundColor,
			padding: 0, margin: 0, display: 'flex', justifyContent: 'center',
			alignItems: 'center', width: '100%', height: '100%',
		}}>
			<canvas ref={canvasVideoBufferRef} width={props.width} height={props.height}
				style={{display: 'none'}}/>
			<pre ref={preTagRef} style={{
				backgroundColor: props.backgroundColor,
				color: props.fontColor, padding: 0, margin: 0,
			}}>
				{asciiText}
			</pre>
		</div>
	);
};

export default VideoAscii;
