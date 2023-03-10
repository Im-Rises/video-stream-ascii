import React, {useRef, useEffect, useState} from 'react';
import {asciiChars} from '../constants/pixel-ascii';
import {calculateAndSetFontSize, getAsciiFromImage, lineSpacing} from '../canvas-handler/video-canvas-ascii';

type Props = {
	videoStreaming: HTMLVideoElement;
	parentRef: React.RefObject<HTMLElement>;
	charsPerLine: number;
	charsPerColumn: number;
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
		calculateAndSetFontSize(preTagRef.current!, props.charsPerLine, props.charsPerColumn, props.parentRef.current!.clientWidth, props.parentRef.current!.clientHeight);

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
	}, [props.videoStreaming, props.charsPerLine, props.charsPerColumn, props.frameRate]);

	return (
		<div style={{
			backgroundColor: props.backgroundColor,
			padding: 0, margin: 0, display: 'flex', justifyContent: 'center',
			alignItems: 'center', width: '100%', height: '100%',
		}}>
			<canvas ref={canvasVideoBufferRef} width={props.charsPerLine} height={props.charsPerColumn}
				style={{display: 'none'}}/>
			<pre ref={preTagRef} style={{
				backgroundColor: props.backgroundColor,
				color: props.fontColor, padding: 0, margin: 0, letterSpacing: `${lineSpacing}em`,
			}}>
				{asciiText}
			</pre>
		</div>
	);
};

export default VideoAscii;
