import React, {useRef, useEffect, useState} from 'react';
import {asciiChars} from '../constants/pixel-ascii';
import {
	calculateAndSetFontSize,
	getAsciiFromImage,
	getAsciiFromImageColor,
	lineSpacing,
} from '../canvas-handler/video-canvas-ascii';

type Props = {
	videoStreaming: HTMLVideoElement;
	parentRef: React.RefObject<HTMLElement>;
	charsPerLine: number;
	charsPerColumn: number;
	fontColor: string;
	backgroundColor: string;
	useColor: boolean;
	preTagRef?: React.RefObject<HTMLPreElement>;
};

const VideoAscii = (props: Props) => {
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	const preTagRef = props.preTagRef ?? useRef<HTMLPreElement>(null);

	const [asciiText, setAsciiText] = useState('');

	// UseEffect to calculate the font size and set the resize observer (to resize the canvas and the font size, when the parent element is resized)
	useEffect(() => {
		calculateAndSetFontSize(preTagRef.current!, props.charsPerLine, props.charsPerColumn, props.parentRef.current!.clientWidth, props.parentRef.current!.clientHeight);

		// Set a resize observer to the parent element to resize the canvas and the font size
		const resizeObserver = new ResizeObserver(entries => {
			const {width, height} = entries[0].contentRect;
			calculateAndSetFontSize(preTagRef.current!, props.charsPerLine, props.charsPerColumn, width, height);
		});
		if (props.parentRef.current) {
			resizeObserver.observe(props.parentRef.current);
		}

		// Stop the resize observer when the component is unmounted
		return () => {
			resizeObserver.disconnect();
		};
	}, [props.charsPerLine, props.charsPerColumn]);

	// UseEffect to draw the video to the canvas buffer and get the ascii from the canvas buffer on every frame
	useEffect(() => {
		const canvas = canvasVideoBufferRef.current!;
		const context = canvas.getContext('2d', {willReadFrequently: true})!;

		// Animation frame id
		let animationFrameId: number;

		// Refresh the ascii art text every frame
		const updateAscii = () => {
			// Draw video to canvas buffer
			context.drawImage(props.videoStreaming, 0, 0, canvas.width, canvas.height);
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

			// Get ascii from canvas buffer and set it to the text tag
			if (props.useColor) {
				const text = getAsciiFromImageColor(imageData, asciiChars);
				setAsciiText(text);
			} else {
				const text = getAsciiFromImage(imageData, asciiChars);
				setAsciiText(text);
			}

			// Schedule the next frame
			animationFrameId = requestAnimationFrame(updateAscii);
		};

		// Start the animation loop when the component mounts
		updateAscii();

		// Stop the animation loop when the component unmounts
		return () => {
			cancelAnimationFrame(animationFrameId);
		};
	}, [props.useColor]);

	return (
		<div style={{
			backgroundColor: props.backgroundColor,
			padding: 0, margin: 0, display: 'flex', justifyContent: 'center',
			alignItems: 'center', width: '100%', height: '100%',
		}}>
			<canvas ref={canvasVideoBufferRef} width={props.charsPerLine} height={props.charsPerColumn}
				style={{display: 'none'}}/>
			{
				props.useColor
					? (
						<pre ref={preTagRef} dangerouslySetInnerHTML={{__html: asciiText}}
							style={{
								backgroundColor: props.backgroundColor,
								color: props.fontColor, padding: 0, margin: 0, letterSpacing: `${lineSpacing}em`,
							}}
						></pre>
					)
					: (
						<pre ref={preTagRef} style={{
							backgroundColor: props.backgroundColor,
							color: props.fontColor, padding: 0, margin: 0, letterSpacing: `${lineSpacing}em`,
						}}>
							{asciiText}
						</pre>
					)
			}
		</div>
	);
};

export default VideoAscii;
