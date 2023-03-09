import React, {useRef, useState} from 'react';
import VideoAscii from './VideoAscii';
import Webcam from 'react-webcam';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
	const [isCameraReady, setIsCameraReady] = useState(false);
	const [cameraWidth, cameraHeight] = [260, 200];
	const videoRef = useRef<Webcam>(null);

	const handleUserMedia = (stream: MediaStream) => {
		const video = videoRef.current!.video!;
		video.srcObject = stream;
		video.onloadedmetadata = async () => {
			await video.play();
			setIsCameraReady(true);
		};
	};

	return (
		<div className={'Camera-Ascii-Panel'} data-testid='camera-ascii-test'>
			<Webcam ref={videoRef}
				style={{width: 0, height: 0}}
				onUserMedia={handleUserMedia}
			/>
			{isCameraReady ? (
				<VideoAscii videoStreaming={videoRef.current!.video!}
					frameRate={1000 / 30} width={cameraWidth}
					height={cameraHeight}
					fontColor={'white'}
					backgroundColor={'black'}/>
			) : (
				<p className={'Camera-Ascii-Waiting'}>Camera not ready.<br/>Please wait...</p>)}
		</div>
	);
};

export default CameraAsciiPanel;
