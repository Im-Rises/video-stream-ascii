import React, {useEffect, useRef, useState} from 'react';
import VideoAscii from './VideoAscii';
import Webcam from 'react-webcam';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
	// Define the ascii art chars per line
	const charsPerLine = 200;
	const [charsPerColumn, setCharsPerColumn] = useState(0);

	// Define the hook state for the webcam
	const [isCameraReady, setIsCameraReady] = useState(false);

	// Define the refs
	const videoRef = useRef<Webcam>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	const calculateCharsPerColumn = (video: HTMLVideoElement) => Math.round(charsPerLine * (video.videoHeight / video.videoWidth));

	// Handle the webcam ready event
	const handleUserMedia = (stream: MediaStream) => {
		const video = videoRef.current!.video!;
		video.srcObject = stream;
		video.onloadedmetadata = async () => {
			// Start the video
			await video.play();

			// Calculate the chars per column according to the input video aspect ratio
			setCharsPerColumn(calculateCharsPerColumn(video));
			setIsCameraReady(true);
		};
	};

	const handleOrientationChange = () => {
		const video = videoRef.current!.video!;
		setCharsPerColumn(calculateCharsPerColumn(video));
	};

	// Get the orientation change event
	const mediaQuery = window.matchMedia('(orientation: landscape)');

	// Add the event listener of the orientation change
	useEffect(() => {
		// On some devices, the change from portrait to landscape is not changing the video aspect ratio so no detection is done
		mediaQuery.addEventListener('change', handleOrientationChange);

		// Remove the event listener when the component is unmounted
		return () => {
			mediaQuery.removeEventListener('change', handleOrientationChange);
		};
	}, []);

	// Tags of the webcam and video ascii element
	// Show the webcam only when it is ready, otherwise show a loading message
	return (
		<div className={'Camera-Ascii-Panel'} data-testid='camera-ascii-test' ref={parentRef}>
			<Webcam ref={videoRef}
				style={{width: 0, height: 0}}
				onUserMedia={handleUserMedia}
			/>
			{isCameraReady ? (
				<VideoAscii videoStreaming={videoRef.current!.video!}
					parentRef={parentRef}
					frameRate={30}
					charsPerLine={charsPerLine}
					charsPerColumn={charsPerColumn}
					fontColor={'white'}
					backgroundColor={'black'}/>
			) : (
				<p className={'Camera-Ascii-Waiting'}>Camera not ready.<br/>Please wait...</p>)}
		</div>
	);
};

export default CameraAsciiPanel;
