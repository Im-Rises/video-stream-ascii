import React, {useEffect} from 'react';
import './App.css';
import CameraAsciiPanel from './components/CameraAsciiPanel';
import GitHubProjectPanel from './components/GitHubProjectPanel';

const App = () => (
	<div className='App'>
		<GitHubProjectPanel link={'https://github.com/Im-Rises/video-ascii'}
			linkText={'Im-Rises/video-ascii'}/>
		<CameraAsciiPanel/>
	</div>
);

export default App;
