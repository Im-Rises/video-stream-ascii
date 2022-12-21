import React, {useRef, useEffect} from 'react';

function FitText(text: string, width: number, fontSize = 16) {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas!.getContext('2d');

		// Set the font size and measure the width of the text
		ctx!.font = `${fontSize}px sans-serif`;
		let textWidth = ctx!.measureText(text).width;

		// If the text is too wide, decrease the font size until it fits
		while (textWidth > width) {
			fontSize -= 1;
			ctx!.font = `${fontSize}px sans-serif`;
			textWidth = ctx!.measureText(text).width;
		}

		// Draw the text on the canvas
		ctx!.fillText(text, 0, fontSize);
	}, [text, width, fontSize]);

	return <canvas ref={canvasRef} width={width} height={fontSize}/>;
}
