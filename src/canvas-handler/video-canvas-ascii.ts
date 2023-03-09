const pixelToAsciiChar = (intensity: number, asciiChars: string) => asciiChars[Math.floor(intensity / 256 * asciiChars.length)];

const getAsciiFromImage = (imageData: ImageData, asciiChars: string) => {
	const {width} = imageData;
	const {height} = imageData;
	const pixels = imageData.data;

	let asciiImage = '';
	for (let y = 0; y < height; y += 1) {
		for (let x = 0; x < width; x++) {
			const index = ((y * width) + x) * 4;
			const intensity = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
			asciiImage += pixelToAsciiChar(intensity, asciiChars);
		}

		asciiImage += '\n';
	}

	return asciiImage;
};

const incrementFontValue = 0.1;
const initFontSize = 0.1;

const calculateAndSetFontSize = (pretag: HTMLPreElement, charsPerLine: number, charsPerColumn: number, parentWidth: number, parentHeight: number) => {
	// Create one string with, one line of text filled with W
	const filledStringLine = String('W').repeat(charsPerLine);

	// Set init font size
	let fontSize = initFontSize;

	// Create a pre element to calculate the height of the text
	const preElementBuffer = document.createElement('pre');
	preElementBuffer.style.fontSize = `${fontSize}px`;
	preElementBuffer.style.fontFamily = 'monospace';

	// Filled the pre element with `filledStringLine` for each line
	for (let i = 0; i < charsPerColumn; i++) {
		preElementBuffer.append(filledStringLine);
		preElementBuffer.append('\n');
	}

	// Append the pre element to the DOM to calculate the width and height
	document.body.appendChild(preElementBuffer);

	// Calculate width and height of the pre element
	// const preWidth = preElementBuffer.offsetWidth;
	let preWidth = preElementBuffer.getBoundingClientRect().width;
	// const preHeight = preElementBuffer.offsetHeight;
	let preHeight = preElementBuffer.getBoundingClientRect().height;

	// Increase the font size until the text is wider than the screen in width or height
	while ((preWidth < parentWidth) && (preHeight < parentHeight)) {
		fontSize += incrementFontValue;
		preElementBuffer.style.fontSize = `${fontSize}px`;
		preWidth = preElementBuffer.getBoundingClientRect().width;
		preHeight = preElementBuffer.getBoundingClientRect().height;
	}

	// Remove the pre tag buffer
	preElementBuffer.remove();

	// Decrease the font size by one to get the correct size
	fontSize -= incrementFontValue;

	console.log('parentWidth', parentWidth);
	console.log('calculated width', preWidth);

	console.log('parentHeight', parentHeight);
	console.log('Calculate height', preHeight);

	// Set the font size
	pretag.style.fontSize = `${fontSize}px`;

	// Debug
	console.log(`Setting font size to ${fontSize}`);
};

export {getAsciiFromImage, calculateAndSetFontSize};
