import React, {useRef, useEffect} from 'react';

type CanvasFitTextProps = {
	inputText: string;
	canvasWidth: number;
	initFontSize: number;
};

function CanvasFitText(props: CanvasFitTextProps) {
	// const refreshRate = 1000 / 30;
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const updateCanvas = () => {
			const canvas = canvasRef.current;
			const ctx = canvas!.getContext('2d');
			let fontSize = props.initFontSize;

			// Set the font size and measure the width of the text
			ctx!.font = `${fontSize}px sans-serif`;
			let textWidth = ctx!.measureText(props.inputText).width;

			// If the text is too wide, decrease the font size until it fits
			while (textWidth > props.canvasWidth) {
				fontSize -= 1;
				ctx!.font = `${fontSize}px sans-serif`;
				textWidth = ctx!.measureText(props.inputText).width;
			}

			// Draw the text on the canvas
			ctx!.fillText(props.inputText, 0, props.initFontSize);
		};

		updateCanvas();
		// setInterval(() => {
		// 	updateCanvas();
		// }, refreshRate);
	}, [props.inputText, props.canvasWidth, props.initFontSize]);

	return <canvas ref={canvasRef} width={props.canvasWidth} height={props.initFontSize}/>;
}

export default CanvasFitText;
