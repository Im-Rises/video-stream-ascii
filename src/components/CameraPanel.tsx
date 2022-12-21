import React from 'react';
import Webcam from 'react-webcam';

function CameraPanel() {
	return (
		<div>
			<Webcam/>
			<canvas id='canvas'/>
		</div>
	);
}

export default CameraPanel;
