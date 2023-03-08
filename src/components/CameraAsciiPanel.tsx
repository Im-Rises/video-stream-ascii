import React, {useRef, useState} from 'react';
import GitHubProjectPanel from './GitHubProjectPanel';
import CameraAscii from './CameraAscii';
import Webcam from 'react-webcam';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
	const [isCameraReady, setIsCameraReady] = useState(false);
	const [cameraWidth = 260, cameraHeight = 200] = [260, 200];
	const videoRef = useRef<Webcam>(null);

	const handleUserMedia = (stream: MediaStream) => {
		const video = videoRef.current!.video!;
		video.srcObject = stream;
		video.onloadedmetadata = async () => {
			await video.play();
			setIsCameraReady(true);
		};
	};

	if (isCameraReady) {
		return (
			<div>
				<Webcam ref={videoRef}
					style={{width: 0, height: 0}}
					onUserMedia={handleUserMedia}
				/>
				<GitHubProjectPanel link={'https://github.com/Im-Rises/video-ascii'}
					linkText={'Im-Rises/video-ascii'}/>
				<CameraAscii videoStreaming={videoRef.current!.video!}
					frameRate={1000 / 30} width={cameraWidth}
					height={cameraHeight}
					fontColor={'white'}
					backgroundColor={'black'}/>
			</div>
		);
	}

	return (
		<div>
			<Webcam ref={videoRef}
				style={{width: 0, height: 0}}
				onUserMedia={handleUserMedia}
			/>
			<GitHubProjectPanel link={'https://github.com/Im-Rises/video-ascii'}
				linkText={'Im-Rises/video-ascii'}/>
		</div>
	);
};

export default CameraAsciiPanel;
