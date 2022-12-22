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
		textWidth = ctx!.measureText(inputText).width;
	}

	if (fontSize < 1) {
		fontSize = 1;
		ctx!.font = `${fontSize}px monospace`;
	}

	for (let i = 0; i < lines.length; i++) {
		ctx!.fillText(lines[i], 0, (fontSize * i) + fontSize);
	}
};

const drawTextInPreTag = (pretag: HTMLPreElement, inputText: string, fontSize: number, fontColor: string) => {
	const lines = inputText.split('\n');

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	ctx!.font = `${fontSize}px monospace`;
	let textWidth = ctx!.measureText(lines[0]).width;

	// If the text is too wide, decrease the font size until it fits
	while (textWidth > canvas.width) {
		fontSize -= 1;
		ctx!.font = `${fontSize}px monospace`;
		textWidth = ctx!.measureText(inputText).width;
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
