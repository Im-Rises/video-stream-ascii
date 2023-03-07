import React, {useRef, useEffect, useState} from 'react';
import GitHubProjectPanel from './GitHubProjectPanel';
import CameraAscii from './CameraAscii';
import Webcam from 'react-webcam';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
	const [isCameraReady, setIsCameraReady] = useState(false);

	const [cameraWidth, setCameraWidth] = useState(260);
	const [cameraHeight, setCameraHeight] = useState(200);

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
		<div>
			<Webcam ref={videoRef}
				style={{width: 0, height: 0}}
				onUserMedia={handleUserMedia}
			/>
			<div>
				<GitHubProjectPanel link={'https://github.com/Im-Rises/video-ascii'}
					linkText={'Im-Rises/video-ascii'}/>
			</div>
			<div className={'Camera-Ascii'}>
				<CameraAscii videoStreaming={videoRef.current!.video!} frameRate={1000 / 30} width={cameraWidth}
							 height={cameraHeight}
							 fontColor={'white'}
							 backgroundColor={'black'} isCameraReady={isCameraReady}/>
			</div>
		</div>
	);
};

export default CameraAsciiPanel;
