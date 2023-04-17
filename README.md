# video-stream-ascii

<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="typescriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="scssLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="cssLogo" style="height:50px;">
</p>

## Description

This is a simple web package that converts a video stream into ASCII art.

## 🚀🚀🚀 [The package is published on npm](https://www.npmjs.com/package/video-stream-ascii) 🚀🚀

It works on desktop and mobile as well, there is two demos, one for the camera and one for a video file.
You can check them at those links:

### 🚀🚀 [You can try it out](https://im-rises.github.io/video-stream-ascii-webcam/) 🚀🚀

### 🚀🚀 [You can try it out](https://im-rises.github.io/video-stream-ascii-reader/) 🚀🚀

The example is using the webcam of your device, but you can use any video stream, like a video file or a video stream.

## Screenshots

<img src="https://user-images.githubusercontent.com/59691442/209728294-e10691da-eb4f-43e6-880c-522417da79c6.png" alt="screenshot" style="width: 100%;">

## Install packages

You can install it by typing the following command in your terminal:

```
npm install video-stream-ascii
```

or

```
yarn add video-stream-ascii
```

## Usage

To use the package, you need to import it into your project:

```js
import {VideoStreamAscii} from "video-stream-ascii";
```

Then you can create use the Component:

```js
<VideoAscii
    videoStreaming={videoRef.current!.video!}
    parentRef={parentRef}
    useColor={true}
    charsPerLine={charsPerLine}
    charsPerColumn={charsPerColumn}
    fontColor={'white'}
    backgroundColor={'black'}
/>
```

You can also pass a pre tag reference to the component, so it can be used to get the ASCII text:

```js
<VideoAscii
    videoStreaming={videoRef.current!.video!}
    parentRef={parentRef}
    useColor={true}
    charsPerLine={charsPerLine}
    charsPerColumn={charsPerColumn}
    fontColor={'white'}
    backgroundColor={'black'}
    preTagRef={preTagRef}
/>
```

To use the component, you need to pass the following props:

- `videoStreaming` - The video stream from the camera.
- `parentRef` - The reference of the parent element, to fit the ascii art in it.
- `useColor` - If the ascii art should use color or not.
- `charsPerLine` - The number of characters per line.
- `charsPerColumn` - The number of characters per column.
- `fontColor` - The color of the font.
- `backgroundColor` - The color of the background.
- `preTagRef` - The reference of the pre tag, to get the ascii art text.

The `parentRef` is used to fit the ascii art in the parent element, so you need to pass the reference of the parent
element like a `div`, you can check the example to see how to use it.

> **Warning**  
> Be careful when using this package, the camera must be working before enabling the video stream.
> If you want to set the ascii art with a correct aspect ratio, follow the example below, for an example of how to use
> it.

An example in the GitHub repository is available, showing how to use the camera stream to convert it into a real-time
ASCII video
here: [video-stream-ascii-example](https://github.com/Im-Rises/video-stream-ascii/blob/main/src/components/CameraAsciiPanel.tsx).

You can test the example at this link: [video-stream-ascii-example](https://im-rises.github.io/video-stream-ascii/).
It will create a video ascii from you camera and output it in real time full screen with auto aspect ratio and a copy to
clipboard button.
You can also find it below:

<details>
    <summary>Click to expand</summary>

```js
import React, {useEffect, useRef, useState} from 'react';
import VideoAscii from './VideoAscii';
import Webcam from 'react-webcam';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
    // Define the ascii art chars per line
    const charsPerLine = 200;
    const [charsPerColumn, setCharsPerColumn] = useState(0);
    const preTagRef = useRef < HTMLPreElement > (null);

    // Define the hook state for the webcam
    const [isCameraReady, setIsCameraReady] = useState(false);

    // Define the refs
    const videoRef = useRef < Webcam > (null);
    const parentRef = useRef < HTMLDivElement > (null);

    // Calculate the chars per column according to the aspect ratio of the video
    const calculateCharsPerColumn = (video: HTMLVideoElement) => Math.round(charsPerLine * (video.videoHeight / video.videoWidth));

    // Handle the webcam ready event
    const handleUserMedia = (stream: MediaStream) => {
        const video = videoRef.current
        !
    .
        video
        !;
        video.srcObject = stream;
        video.onloadedmetadata = async () => {
            // Start the video
            await video.play();

            // Calculate the chars per column according to the input video aspect ratio
            setCharsPerColumn(calculateCharsPerColumn(video));
            setIsCameraReady(true);
        };
    };

    // Handle orientation change
    const handleOrientationChange = () => {
        const video = videoRef.current
        !
    .
        video
        !;
        setCharsPerColumn(calculateCharsPerColumn(video));
    };

    // Get the orientation change event
    const mediaQuery = window.matchMedia('(orientation: landscape)');

    // Add the event listener of the orientation change
    useEffect(() => {
        // On some devices, the change from portrait to landscape need to recalculate the chars per column to fit the aspect ratio
        mediaQuery.addEventListener('change', handleOrientationChange);

        // Remove the event listener when the component is unmounted
        return () => {
            mediaQuery.removeEventListener('change', handleOrientationChange);
        };
    }, []);

    // Handle the copy to clipboard button click
    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
        } catch (err: unknown) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Tags of the webcam and video ascii element
    // Show the webcam only when it is ready, otherwise show a loading message
    return (
        <div className={'Camera-Ascii-Panel'} data-testid='camera-ascii-test' ref={parentRef}>
            <div>
                <button className={'Button-Copy-Clipboard'}
                        onClick={async () => copyToClipboard(preTagRef.current!.innerText)}>Copy
                </button>
            </div>
            <div>
                <Webcam ref={videoRef}
                        style={{width: 0, height: 0, position: 'absolute', top: 0, left: 0}}
                        onUserMedia={handleUserMedia}
                />
                {isCameraReady ? (
                    <VideoAscii
                        videoStreaming={videoRef.current!.video!}
                        parentRef={parentRef}
                        useColor={true}
                        charsPerLine={charsPerLine}
                        charsPerColumn={charsPerColumn}
                        fontColor={'white'}
                        backgroundColor={'black'}
                        preTagRef={preTagRef}
                    />
                ) : (
                    <p className={'Camera-Ascii-Waiting'}>Camera not ready.<br/>Please wait...
                    </p>)}
            </div>
        </div>
    );
};

export default CameraAsciiPanel;
```

</details>

## Dependencies

The project is using React, TypeScript, JavaScript, TensorFlow, SCSS, CSS, etc...

You can find the dependencies in the `dependencies` folder.

It uses the react-webcam library to get the video stream from the webcam.  
<https://www.npmjs.com/package/react-webcam>

## Deployment

To deploy the website, you need to run the following command:

```bash
npm run deploy
```

or if you are using yarn:

```bash 
yarn deploy
```

## Code style

The code style used in this project is XO.
You can find some changes in the `.eslintrc.js` file.
The project is also set up to use ESLint.

## GitHub Actions

[![Node.js CI](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/node.js.yml)
[![ESLint](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/eslint.yml/badge.svg?branch=main)](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/codeql.yml)
[![Node.js Package](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Im-Rises/video-stream-ascii/actions/workflows/npm-publish.yml)

The project is set up to run the following actions:

- node.js.yml : Runs the tests for the Node.js project.
- eslint.yml : Runs the ESLint linter on the project.
- codeql.yml : Runs the CodeQL linter on the project.
- npm-publish.yml : Publishes the package to the npm registry.

## Documentations

Xo:  
<https://github.com/xojs/xo>

ESLint:  
<https://eslint.org/docs/latest/user-guide/getting-started>

GitHub gh-pages:  
<https://github.com/gitname/react-gh-pages>

react-webcam:  
<https://www.npmjs.com/package/react-webcam>

<!--
If not publishing anymore, replace the following line:
    "deploy": "gh-pages -d build"
with 
    "deploy": "gh-pages-clean gh-pages -d build"
then deploy one time and replace it with the original line again
and deploy another time
-->

## Links

Check the source code
on [![github](https://user-images.githubusercontent.com/59691442/223556058-6244e346-8117-43cd-97c6-bf68611bf286.svg)](https://github.com/im-rises/video-stream-ascii)

Check the package
on [![npm](https://user-images.githubusercontent.com/59691442/223556055-4e9ef014-79d4-4136-ac07-b837b49066c8.svg)](https://www.npmjs.com/package/video-stream-ascii)

## Contributors

Quentin MOREL :

- @Im-Rises
- <https://github.com/Im-Rises>

[![GitHub contributors](https://contrib.rocks/image?repo=Im-Rises/video-stream-ascii)](https://github.com/Im-Rises/video-stream-ascii/graphs/contributors)
