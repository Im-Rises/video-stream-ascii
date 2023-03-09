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
const initFontSize = 1.0;// A value to small will make the text too small

const calculateAndSetFontSize = (pretag: HTMLPreElement, charsPerLine: number, charsPerColumn: number, parentWidth: number, parentHeight: number) => {
	// Create one string with, one line of text filled with W
	const filledStringLine = String('W').repeat(charsPerLine);

	// Set init font size
	let fontSize = initFontSize;

	// Create a pre element to calculate the height of the text
	const preElementBuffer = document.createElement('pre');
	preElementBuffer.style.fontSize = `${fontSize}px`;
	preElementBuffer.style.fontFamily = 'monospace';

	// Hide the pre buffer element (display: none, or visibility: hidden, or opacity: 0, or width: 0, or height: 0)
	// preElementBuffer.style.display = 'none';// Setting to none will crash the browser as it becomes null or the height is 0
	// Hidding the element until it is deleted
	// preElementBuffer.style.visibility = 'hidden';
	// preElementBuffer.style.width = '0%';
	// preElementBuffer.style.height = '0%';
	// preElementBuffer.style.opacity = '0';
	preElementBuffer.style.position = 'absolute';

	// Filled the pre element with `filledStringLine` for each line
	for (let i = 0; i < charsPerColumn; i++) {
		preElementBuffer.append(filledStringLine);
		preElementBuffer.append('\n');
	}

	// Append the pre element to the DOM to calculate the width and height
	document.body.appendChild(preElementBuffer);

	// Calculate width and height of the pre element
	// let preWidth = preElementBuffer.offsetWidth;
	let preWidth = preElementBuffer.getBoundingClientRect().width;
	// let preHeight = preElementBuffer.offsetHeight;
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
