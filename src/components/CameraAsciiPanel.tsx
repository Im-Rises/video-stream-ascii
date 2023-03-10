import React, {useRef, useState} from 'react';
import VideoAscii from './VideoAscii';
import Webcam from 'react-webcam';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
	// Define the ascii art chars per column according to ratio of the screen and the chars per line
	const screenRatio = screen.width / screen.height;
	const charsPerLine = 200;
	const charsPerColumn = screenRatio > 1 ? Math.floor(charsPerLine / screenRatio) : Math.floor(charsPerLine * screenRatio);
	const [cameraWidth, cameraHeight] = [charsPerLine, charsPerColumn];

	// Define the hook state for the webcam
	const [isCameraReady, setIsCameraReady] = useState(false);

	// Define the refs
	const videoRef = useRef<Webcam>(null);
	const parentRef = useRef<HTMLDivElement>(null);

	// Handle the webcam ready event
	const handleUserMedia = (stream: MediaStream) => {
		const video = videoRef.current!.video!;
		video.srcObject = stream;
		video.onloadedmetadata = async () => {
			await video.play();
			setIsCameraReady(true);
		};
	};

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
					frameRate={1000 / 30} charsPerLine={cameraWidth}
					charsPerColumn={cameraHeight}
					fontColor={'white'}
					backgroundColor={'black'}/>
			) : (
				<p className={'Camera-Ascii-Waiting'}>Camera not ready.<br/>Please wait...</p>)}
		</div>
	);
};

export default CameraAsciiPanel;
