import React, {useRef, useEffect, useState} from 'react';
import GitHubProjectPanel from './GitHubProjectPanel';
import CameraAscii from './CameraAscii';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
	console.log('CameraAsciiPanel');
	const sliderWidthRef = useRef<HTMLInputElement>(null);
	const sliderHeightRef = useRef<HTMLInputElement>(null);
	const [cameraWidth, setCameraWidth] = useState(320);
	const [cameraHeight, setCameraHeight] = useState(240);

	return (
		<div>
			<GitHubProjectPanel link={'https://github.com/Im-Rises/video-ascii'}
				linkText={'Im-Rises/video-ascii'}/>
			<div className={'Camera-Ascii'}>
				<CameraAscii frameRate={1000 / 30} width={cameraWidth} height={cameraHeight} fontSize={16}
					fontColor={'white'}
					backgroundColor={'black'}/>
			</div>
			<div>
				<h1>Controls</h1>
				<h2>Resolution</h2>
				<p>Width: {sliderWidthRef.current?.value}</p>
				<input type={'range'} ref={sliderWidthRef} min={10} max={1920} defaultValue={320} step={1}
					onChange={() => {
						setCameraWidth(parseInt(sliderWidthRef.current!.value, 10));
					}}/>
				<p>Height: {cameraHeight}</p>
				<input type={'range'} ref={sliderHeightRef} min={10} max={1080} defaultValue={240} step={1}
					onChange={() => {
						setCameraHeight(parseInt(sliderHeightRef.current!.value, 10));
					}}/>
			</div>
		</div>);
};

export default CameraAsciiPanel;
