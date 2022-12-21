const convertVideoToAscii = (inputCanvas: HTMLCanvasElement, outputCanvas: HTMLCanvasElement) => {
	const outputContext = outputCanvas.getContext('2d');
	const inputContext = inputCanvas.getContext('2d');
	const imageData = inputContext!.getImageData(0, 0, inputCanvas.width, inputCanvas.height);
	for (let i = 0; i < imageData.data.length; i += 4) {
		const r = imageData.data[i];
		const g = imageData.data[i + 1];
		const b = imageData.data[i + 2];
		const a = imageData.data[i + 3];
		const gray = (r + g + b) / 3;
		const grayAlpha = gray * a / 255;
		imageData.data[i] = grayAlpha;
		imageData.data[i + 1] = grayAlpha;
		imageData.data[i + 2] = grayAlpha;
		imageData.data[i + 3] = 255;
	}
};

export default convertVideoToAscii;
