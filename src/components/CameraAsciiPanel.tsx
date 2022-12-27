import React, {useRef, useEffect} from 'react';
import GitHubProjectPanel from './GitHubProjectPanel';
import CameraAscii from './CameraAscii';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => (
	<div>
		<GitHubProjectPanel link={'https://github.com/Im-Rises/video-ascii'}
			linkText={'Im-Rises/video-ascii'}/>
		<div className={'Camera-Ascii'}>
			<CameraAscii frameRate={1000 / 30} width={200} height={200} fontSize={16} fontColor={'white'}
				backgroundColor={'black'}/>
		</div>
	</div>
);

export default CameraAsciiPanel;
