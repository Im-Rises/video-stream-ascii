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
	preTagRef?: React.RefObject<HTMLPreElement>;
	useColor?: boolean;
};

const VideoAscii = (props: Props) => {
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = props.preTagRef ?? useRef<HTMLPreElement>(null);

	const [asciiText, setAsciiText] = useState('');

	useEffect(() => {
		const canvas = canvasVideoBufferRef.current!;
		const context = canvas.getContext('2d', {willReadFrequently: true})!;
		calculateAndSetFontSize(preTagRef.current!, props.charsPerLine, props.charsPerColumn, props.parentRef.current!.clientWidth, props.parentRef.current!.clientHeight);

		// Set a resize observer to the parent element to resize the canvas and the font size
		const resizeObserver = new ResizeObserver(entries => {
			const {width, height} = entries[0].contentRect;
			calculateAndSetFontSize(preTagRef.current!, props.charsPerLine, props.charsPerColumn, width, height);
		});
		if (props.parentRef.current) {
			resizeObserver.observe(props.parentRef.current);
		}

		// Refresh the ascii art text every frame
		const updateAscii = () => {
			// Draw video to canvas buffer
			context.drawImage(props.videoStreaming, 0, 0, canvas.width, canvas.height);
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

			// Get ascii from canvas buffer and set it to the text tag
			const text = getAsciiFromImage(imageData, asciiChars);
			setAsciiText(text);
		};

		// Start the update loop
		const intervalId = setInterval(updateAscii, 1000 / props.frameRate);

		// Stop the update loop and the resize observer when the component is unmounted
		return () => {
			clearInterval(intervalId);
			resizeObserver.disconnect();
		};
	}, [props.charsPerLine, props.charsPerColumn, props.frameRate]);

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
			{/* <div dangerouslySetInnerHTML={{__html: asciiText}}></div> */}
		</div>
	);
};

export default VideoAscii;
