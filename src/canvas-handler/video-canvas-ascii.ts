const pixelToAsciiChar = (intensity: number, asciiChars: string) => asciiChars[Math.floor(intensity / 256 * asciiChars.length)];

const getAsciiFromImage = (imageData: ImageData, asciiChars: string) => {
	const {width} = imageData;
	const {height} = imageData;
	const pixels = imageData.data;

	let asciiImage = '';
	for (let y = 0; y < height; y += 2) {
		for (let x = 0; x < width; x++) {
			const index = ((y * width) + x) * 4;
			const intensity = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
			asciiImage += pixelToAsciiChar(intensity, asciiChars);
		}

		asciiImage += '\n';
	}

	return asciiImage;
};

const calculateStringWidth = (context: CanvasRenderingContext2D, text: string): number => context.measureText(text).width;

const calculateStringHeight = (context: CanvasRenderingContext2D, text: string, charsPerColumn: number): number => charsPerColumn * (context.measureText(text).actualBoundingBoxAscent + context.measureText(text).actualBoundingBoxDescent) * 0.8;

const incrementFontValue = 0.1;
const initFontSize = 0.1;

const calculateAndSetFontSize = (pretag: HTMLPreElement, charsPerLine: number, charsPerColumn: number, parentWidth: number, parentHeight: number) => {
	// Create a text fill with the same width as the ascii text and add \n for the end of each line
	const filledStringLine = String('W').repeat(charsPerLine);

	// Create a canvas to measure the width of the text
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	let fontSize = initFontSize;
	context!.font = `${fontSize}px monospace`;

	// Increase the font size until the text is wider than the screen in width or height
	let textWidth = calculateStringWidth(context!, filledStringLine);
	let textHeight = calculateStringHeight(context!, filledStringLine, charsPerColumn);
	while ((textWidth < parentWidth) && textHeight < parentHeight) {
		fontSize += incrementFontValue;
		context!.font = `${fontSize}px monospace`;
		textWidth = calculateStringWidth(context!, filledStringLine);
		textHeight = calculateStringHeight(context!, filledStringLine, charsPerColumn);
	}

	// Remove the created canvas
	canvas.remove();

	// Decrease the font size by one to get the correct size
	fontSize -= incrementFontValue;

	console.log('Calculate height', textHeight);
	console.log('parentHeight', parentHeight);

	// Set the font size
	pretag.style.fontSize = `${fontSize}px`;

	// Debug
	console.log(`Setting font size to ${fontSize}`);
};

export {getAsciiFromImage, calculateAndSetFontSize};
