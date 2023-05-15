import React, {useRef, useEffect, useState, createRef} from 'react';
import {asciiChars} from '../constants/pixel-ascii';
import {
	calculateAndSetFontSize, canvasImgToUrl,
	getAsciiFromImage,
	getAsciiFromImageColor, lineHeight,
	lineSpacing, videoImgToUrl,
} from '../canvas-handler/video-canvas-ascii';

export enum ArtTypeEnum {
	ASCII = 'ASCII',
	ASCII_COLOR = 'ASCII_COLOR',
	ASCII_COLOR_BG_IMAGE = 'ASCII_COLOR_BG_IMAGE',
}

type Props = {
	videoStreaming: HTMLVideoElement;
	parentRef: React.RefObject<HTMLElement>;
	charsPerLine: number;
	charsPerColumn: number;
	fontColor: string;
	backgroundColor: string;
	artType: ArtTypeEnum;
	flipY?: boolean;
	preTagRef?: React.RefObject<HTMLPreElement>;
};

const defaultProps = {
	flipY: false,
	preTagRef: createRef<HTMLPreElement>(),
};

export const VideoAscii = (props: Props) => {
	// Merge the props with the default props
	const mergedProps = {...defaultProps, ...props};

	// Set the local variables
	const canvasVideoBufferRef = useRef<HTMLCanvasElement>(null);
	const [asciiText, setAsciiText] = useState('');

	// UseEffect to calculate the font size and set the resize observer (to resize the canvas and the font size, when the parent element is resized)
	useEffect(() => {
		calculateAndSetFontSize(mergedProps.preTagRef.current!, props.charsPerLine, props.charsPerColumn, props.parentRef.current!.clientWidth, props.parentRef.current!.clientHeight);

		// Set a resize observer to the parent element to resize the canvas and the font size
		const resizeObserver = new ResizeObserver(entries => {
			const {width, height} = entries[0].contentRect;
			calculateAndSetFontSize(mergedProps.preTagRef.current!, props.charsPerLine, props.charsPerColumn, width, height);
		});
		if (props.parentRef.current) {
			resizeObserver.observe(props.parentRef.current);
		}

		// Stop the resize observer when the component is unmounted
		return () => {
			resizeObserver.disconnect();
		};
	}, [props.videoStreaming, props.parentRef, props.charsPerLine, props.charsPerColumn, props.artType]);

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

			switch (props.artType) {
				case ArtTypeEnum.ASCII:
					setAsciiText(getAsciiFromImage(imageData, asciiChars));
					break;
				case ArtTypeEnum.ASCII_COLOR:
					setAsciiText(getAsciiFromImageColor(imageData, asciiChars));
					break;
				case ArtTypeEnum.ASCII_COLOR_BG_IMAGE:
					setAsciiText(getAsciiFromImage(imageData, asciiChars));
					// Set the background image of the pre tag to the resized canvas
					mergedProps.preTagRef.current!.style.backgroundImage = `url(${canvasImgToUrl(canvas).src})`;
					// // Set the background image of the pre tag to the original dimensions video
					// mergedProps.preTagRef.current!.style.backgroundImage = `url(${videoImgToUrl(props.videoStreaming).src})`;
					break;
				default:
					break;
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
	}, [props.videoStreaming, props.artType]);

	return (
		<div style={{
			backgroundColor: props.backgroundColor,
			padding: 0, margin: 0, display: 'flex', justifyContent: 'center',
			alignItems: 'center', width: '100%', height: '100%',
		}}>
			<canvas ref={canvasVideoBufferRef} width={props.charsPerLine} height={props.charsPerColumn}
				style={{display: 'none'}}/>
			{
				(() => {
					switch (props.artType) {
						case ArtTypeEnum.ASCII:
							return (
								<pre ref={mergedProps.preTagRef} style={{
									backgroundColor: props.backgroundColor,
									color: props.fontColor,
									padding: 0,
									margin: 0,
									letterSpacing: `${lineSpacing}em`,
									lineHeight: `${lineHeight}em`,
									transform: `scaleX(${mergedProps.flipY ? -1 : 1})`,
									overflow: 'hidden',
								}}>
									{asciiText}
								</pre>
							);
						case ArtTypeEnum.ASCII_COLOR:
							return (
								<pre ref={mergedProps.preTagRef} dangerouslySetInnerHTML={{__html: asciiText}}
									style={{
										backgroundColor: props.backgroundColor,
										color: props.fontColor,
										padding: 0,
										margin: 0,
										letterSpacing: `${lineSpacing}em`,
										lineHeight: `${lineHeight}em`,
										transform: `scaleX(${mergedProps.flipY ? -1 : 1})`,
										overflow: 'hidden',
									}}
								></pre>
							);
						case ArtTypeEnum.ASCII_COLOR_BG_IMAGE:
							return (
								<span>
									{
										/*
                                        This span is important for the browser, it helps differentiate
                                        the other pre tag from the one with the background image when
                                        toggling the artType. If the pre tag is not present, the browser
                                        might think that the change of pre tag is an update not a replace
                                         */
									}
									<pre ref={mergedProps.preTagRef} style={{
										padding: 0,
										margin: 0,
										letterSpacing: `${lineSpacing}em`,
										lineHeight: `${lineHeight}em`,
										backgroundSize: '100% 100%',
										backgroundClip: 'text',
										WebkitBackgroundClip: 'text',
										color: 'transparent',
										transform: `scaleX(${mergedProps.flipY ? -1 : 1})`,
										overflow: 'hidden',
									}}>
										{asciiText}
									</pre>
								</span>
							);
						default:
							return (<p>ERROR</p>);
					}
				})()
			}
		</div>
	);
};
