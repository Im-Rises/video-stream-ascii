import React, {useRef, useEffect, useState} from 'react';
import GitHubProjectPanel from './GitHubProjectPanel';
import CameraAscii from './CameraAscii';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
	const sliderWidthRef = useRef<HTMLInputElement>(null);
	const sliderHeightRef = useRef<HTMLInputElement>(null);
	const [cameraWidth, setCameraWidth] = useState(260);
	const [cameraHeight, setCameraHeight] = useState(200);
	const checkboxAspectRatioRef = useRef<HTMLInputElement>(null);
	const aspectRatio = cameraWidth / cameraHeight;

	return (
		<div>
			<div>
				<GitHubProjectPanel link={'https://github.com/Im-Rises/video-ascii'}
					linkText={'Im-Rises/video-ascii'}/>
			</div>
			<div className={'Camera-Ascii'}>
				<CameraAscii frameRate={1000 / 30} width={cameraWidth} height={cameraHeight} fontSize={16}
					fontColor={'white'}
					backgroundColor={'black'}/>
			</div>
			{/* <div className={'Camera-Controller'}> */}
			{/*	<p>Width: {cameraWidth} char</p> */}
			{/*	<input type={'range'} ref={sliderWidthRef} min={10} max={1000} defaultValue={cameraWidth} step={1} */}
			{/*		onChange={() => { */}
			{/*			setCameraWidth(parseInt(sliderWidthRef.current!.value, 10)); */}
			{/*			if (checkboxAspectRatioRef.current!.checked) { */}
			{/*				setCameraHeight(Math.round(cameraWidth / aspectRatio)); */}
			{/*			} */}
			{/*		}}/> */}
			{/*	<p>Height: {cameraHeight} char</p> */}
			{/*	<input type={'range'} ref={sliderHeightRef} min={10} max={1000} defaultValue={cameraHeight} step={1} */}
			{/*		onChange={() => { */}
			{/*			setCameraHeight(parseInt(sliderHeightRef.current!.value, 10)); */}
			{/*			if (checkboxAspectRatioRef.current!.checked) { */}
			{/*				setCameraWidth(Math.round(cameraHeight * aspectRatio)); */}
			{/*			} */}
			{/*		}}/> */}
			{/*	<br/> */}
			{/*	<input type={'checkbox'} name={'checkboxRatio'} defaultValue={'checked'} ref={checkboxAspectRatioRef} */}
			{/*		onChange={() => { */}
			{/*			aspectRatio = cameraWidth / cameraHeight; */}
			{/*		}}/> */}
			{/*	<label htmlFor={'checkboxRatio'}>Keep ratio</label> */}
			{/* </div> */}
		</div>
	);
};

export default CameraAsciiPanel;
