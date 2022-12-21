import '../constants/pixel-ascii';
import {debug} from 'util';

const convertVideoToAscii = (inputCanvas: HTMLCanvasElement, outputCanvas: HTMLCanvasElement, asciiArray: string[]) => {
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
		const asciiIndex = mapValueToOtherRange(grayAlpha, 0, 255, 0, asciiArray.length - 1);
		const x = (i / 4) % inputCanvas.width;
		const y = Math.floor((i / 4) / inputCanvas.width);
		outputContext!.font = '1px';
		outputContext!.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
		outputContext!.fillText(asciiArray[asciiIndex], x, y);
	}

	console.log('Done');
};

const mapValueToOtherRange = (value: number, baseStartIndex: number, baseEndIndex: number, otherStartIndex: number, otherEndIndex: number) => {
	const baseRange = baseEndIndex - baseStartIndex;
	const otherRange = otherEndIndex - otherStartIndex;
	const valueRelativeToBaseStart = value - baseStartIndex;
	const valueRelativeToOtherStart = valueRelativeToBaseStart * otherRange / baseRange;
	return Math.floor(valueRelativeToOtherStart + otherStartIndex);
};

export default convertVideoToAscii;
