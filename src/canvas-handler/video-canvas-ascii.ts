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
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	let fontSize = 1;
	ctx!.font = `${fontSize}px monospace`;

	const textToMeasureWidth = String(' ').repeat(asciiTextWidth);

	while (ctx!.measureText(textToMeasureWidth).width < screenWidth) {
		ctx!.font = `${fontSize}px monospace`;
		fontSize += 1;
	}

	// const textToMeasureHeight = String('\n').repeat(asciiTextHeight);
	if (fontSize * asciiTextHeight > screenHeight) {
		while (fontSize * asciiTextHeight > screenHeight) {
			fontSize -= 1;
			ctx!.font = `${fontSize}px monospace`;
		}
	}

	if (fontSize < 1) {
		fontSize = 1;
	}

	pretag.style.fontSize = `${fontSize}px`;

	console.log('fontSize', fontSize);
};

export {getAsciiFromImage, calculateAndSetFontSize};
