const getAsciiCharFromIntensity = (intensity: number, asciiChars: string) => asciiChars[Math.floor(intensity / 256 * asciiChars.length)];

const getAsciiFromImage = (imageData: ImageData, asciiChars: string) => {
	const {width} = imageData;
	const {height} = imageData;
	const pixels = imageData.data;

	let asciiImage = '';
	for (let y = 0; y < height; y += 2) {
		for (let x = 0; x < width; x++) {
			const index = ((y * width) + x) * 4;
			const intensity = (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
			asciiImage += getAsciiCharFromIntensity(intensity, asciiChars);
		}

		asciiImage += '\n';
	}

	return asciiImage;
};

const drawTextInCanvas = (canvas: HTMLCanvasElement, inputText: string, fontSize: number, fontColor: string) => {
	const ctx = canvas.getContext('2d');

	const lines = inputText.split('\n');

	// Set the font size and measure the width of the text
	ctx!.font = `${fontSize}px monospace`;
	ctx!.fillStyle = fontColor;
	let textWidth = ctx!.measureText(lines[0]).width;

	// If the text is too wide, decrease the font size until it fits
	while (textWidth > canvas.width) {
		fontSize -= 1;
		ctx!.font = `${fontSize}px monospace`;
		textWidth = ctx!.measureText(lines[0]).width;
	}

	if (fontSize < 1) {
		fontSize = 1;
		ctx!.font = `${fontSize}px monospace`;
	}

	for (let i = 0; i < lines.length; i++) {
		ctx!.fillText(lines[i], 0, (fontSize * i) + fontSize);
	}
};

const drawTextInPreTag = (pretag: HTMLPreElement, inputText: string, fontSize: number, fontColor: string, screenWidth: number, screenHeight: number) => {
	const lines = inputText.split('\n');

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	ctx!.font = `${fontSize}px monospace`;
	let textWidth = ctx!.measureText(lines[0]).width;

	// If the text width is too wide, decrease the font size until it fits
	while (textWidth > screenWidth) {
		fontSize -= 1;
		ctx!.font = `${fontSize}px monospace`;
		textWidth = ctx!.measureText(lines[0]).width;
	}

	// If the text is too tall, decrease the font size until it fits
	while ((fontSize + 2) * lines.length > screenHeight) {// Offset by 1.6/2 to account for the line height
		fontSize -= 1;
		ctx!.font = `${fontSize}px monospace`;
	}

	if (fontSize < 1) {
		fontSize = 1;
		ctx!.font = `${fontSize}px monospace`;
	}

	pretag.style.fontSize = `${fontSize}px`;
	pretag.style.color = fontColor;
	pretag.innerText = inputText;
};

export {getAsciiFromImage, drawTextInCanvas, drawTextInPreTag};
