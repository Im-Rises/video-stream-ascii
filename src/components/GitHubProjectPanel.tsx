import React, {useRef, useEffect} from 'react';
import './GitHubProjectPanel.css';

type Params = {
	link: string;
	linkText: string;
};

const GitHubProjectPanel = (params: Params) => (
	<div className='Project-Panel'>
		<div className={'Project-Link'}>
			<h2>Github project link</h2>
			<a href={params.link} target={'_blank'} rel='noreferrer'>
				<p>{params.linkText}</p></a>
		</div>
	</div>
);

export default GitHubProjectPanel;
