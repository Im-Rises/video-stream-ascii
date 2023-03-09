import React, {useEffect} from 'react';
import './App.css';
import CameraAsciiPanel from './components/CameraAsciiPanel';
import GitHubProjectPanel from './components/GitHubProjectPanel';
import {GITHUB_LINK_TEXT, GITHUB_URL} from './constants/pixel-ascii';

const App = () => (
	<div className='App'>
		<GitHubProjectPanel link={GITHUB_URL}
			linkText={GITHUB_LINK_TEXT}/>
		<CameraAsciiPanel/>
	</div>
);

export default App;
