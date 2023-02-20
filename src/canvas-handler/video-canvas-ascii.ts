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

const calculateAndSetFontSize = (pretag: HTMLPreElement, asciiTextWidth: number, asciiTextHeight: number, screenWidth: number, screenHeight: number) => {
	// Create a text fill with the same width as the ascii text and add \n for the end of each line
	let stringToMeasure = 'W';
	for (let i = 0; i < asciiTextHeight - 1; i++) {
		for (let j = 0; j < asciiTextWidth - 1; j++) {
			stringToMeasure += 'W';
		}

		stringToMeasure += '\n';
	}

	// Split the string into lines
	const lines = stringToMeasure.split('\n');
	// console.log(lines[0].length);
	// console.log(lines.length);

	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	let fontSize = 1;
	context!.font = `${fontSize}px monospace`;

	while (context!.measureText(lines[0]).width < screenWidth && lines.length * fontSize < screenHeight) {
		fontSize += 1;
		context!.font = `${fontSize}px monospace`;
	}

	fontSize -= 1;

	pretag.style.fontSize = `${fontSize}px`;
	console.log(`Setting font size to ${fontSize}`);
};

/*
* 	const fontSizeWidth = Math.floor(screenWidth / asciiTextWidth);
	const fontSizeHeight = Math.floor(screenHeight / asciiTextHeight);
	const fontSizeMin = Math.min(fontSizeWidth, fontSizeHeight);
	const fontSizeMax = Math.max(fontSizeWidth, fontSizeHeight);

	// console.log('fontSizeMax * asciiTextWidth > screenWidth', fontSizeMax * asciiTextWidth > screenWidth);
	// console.log('fontSizeMax = ', fontSizeMax);
	// console.log('asciiTextWidth = ', asciiTextWidth);
	// console.log('screenWidth = ', screenWidth);
	//
	// console.log('fontSizeMax * asciiTextHeight > screenHeight', fontSizeMax * asciiTextHeight > screenHeight);
	// console.log('fontSizeMax = ', fontSizeMax);
	// console.log('asciiTextHeight = ', asciiTextHeight);
	// console.log('screenHeight = ', screenHeight);
	if (fontSizeMax * asciiTextWidth > screenWidth) {
		pretag.style.fontSize = `${fontSizeMin}px`;
	} else {
		pretag.style.fontSize = `${fontSizeMax}px`;
	}

	console.log('fontSizeMin = ', fontSizeMin);
	console.log('fontSizeMax = ', fontSizeMax);

	// pretag.style.fontSize = `${fontsize}px`;
* */

export {getAsciiFromImage, calculateAndSetFontSize};
