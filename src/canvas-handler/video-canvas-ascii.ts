// import '../constants/pixel-ascii';
//
// const convertVideoToAscii = (inputCanvas: HTMLCanvasElement, outputCanvas: HTMLCanvasElement, asciiArray: string[]) => {
// 	const outputContext = outputCanvas.getContext('2d');
// 	const inputContext = inputCanvas.getContext('2d');
// 	const fontSize = inputCanvas.width / outputCanvas.width;
// 	const imageData = inputContext!.getImageData(0, 0, inputCanvas.width, inputCanvas.height);
// 	for (let i = 0; i < imageData.data.length; i += 4) {
// 		const r = imageData.data[i];
// 		const g = imageData.data[i + 1];
// 		const b = imageData.data[i + 2];
// 		const a = imageData.data[i + 3];
// 		const gray = (r + g + b) / 3;
// 		const grayAlpha = gray * a / 255;
// 		const asciiIndex = mapValueToOtherRange(grayAlpha, 0, 255, 0, asciiArray.length - 1);
// 		const x = (i / 4) % inputCanvas.width;
// 		const y = Math.floor((i / 4) / inputCanvas.width);
// 		// outputContext!.font = '10px';
// 		// outputContext!.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
// 		// outputContext!.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
// 		// outputContext!.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${a})`;
//
// 		outputContext!.font = `${fontSize}px`;
// 		// outputContext!.fillText('Hello World', 10, 10);
//
// 		outputContext!.fillText(asciiArray[asciiIndex], x + fontSize, y + fontSize);
// 	}
//
// 	outputContext!.font = '22px';
// 	// outputContext!.fillText('Hello World', 10, 10);
//
// 	console.log('Done for an image of size: ', inputCanvas.width, inputCanvas.height);
// };
//
// const mapValueToOtherRange = (value: number, baseStartIndex: number, baseEndIndex: number, otherStartIndex: number, otherEndIndex: number) => {
// 	const baseRange = baseEndIndex - baseStartIndex;
// 	const otherRange = otherEndIndex - otherStartIndex;
// 	const valueRelativeToBaseStart = value - baseStartIndex;
// 	const valueRelativeToOtherStart = valueRelativeToBaseStart * otherRange / baseRange;
// 	return Math.floor(valueRelativeToOtherStart + otherStartIndex);
// };
//
// export default convertVideoToAscii;

function getAsciiChar(intensity: number, asciiChars: string) {
	return asciiChars[Math.floor(intensity / 256 * asciiChars.length)];
}

function getAsciiImage(imageData: ImageData, asciiChars: string) {
	const {width} = imageData;
	const {height} = imageData;
	const pixels = imageData.data;

	let asciiImage = '';
	for (let y = 0; y < height; y += 2) {
		for (let x = 0; x < width; x++) {
			const index = ((y * width) + x) * 4;
			const intensity = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
			asciiImage += getAsciiChar(intensity, asciiChars);
		}

		asciiImage += '\n';
	}

	return asciiImage;
}

export {getAsciiImage};
