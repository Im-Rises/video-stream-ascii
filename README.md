# video-ascii

<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="typescriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="scssLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="cssLogo" style="height:50px;">
</p>

## Description

This is a simple web package that converts a video stream into ASCII art.

## 🚀🚀 [You can try it out](https://im-rises.github.io/video-ascii/) 🚀🚀

It works on desktop and mobile as well, the example use the camera of your device and convert the video stream into
ASCII art in real time.

## 🚀🚀 [The package is published on npm](https://www.npmjs.com/package/video-stream-ascii) 🚀🚀

## Screenshots

<img src="https://user-images.githubusercontent.com/59691442/209728294-e10691da-eb4f-43e6-880c-522417da79c6.png" alt="screenshot" style="width: 100%;">

## Project architecture

<details>
    <summary>Click to expand</summary>

~~~
video-ascii
├── .github
│  ├── workflows
│  │   |── codeql.yml
│  │   |── dependency-review.yml
│  │   |── eslint.yml
│  │   |── greetings.yml
│  │   |── label.yml
│  │   |── node.yml
│  │   |── stale.yml
|  ├── labeler.yml
|  ├── release.yml
├── public
│  ├── face-logo.ico
│  ├── face-logo192.png
│  ├── face-logo512.png
│  ├── index.html
│  ├── manifest.json
│  ├── robots.txt
├── src
|  ├── canvas-handler
│  │   |── canvas-handler.ts
|  ├── components
│  │   |── VideoAscii.scss
│  │   |── VideoAscii.tsx
│  │   |── CameraAsciiPanel.scss
│  │   |── CameraAsciiPanel.tsx
│  │   |── GitHubProjectPanel.scss
│  │   |── GitHubProjectPanel.tsx
|  ├── constants
│  │   |── pixel-ascii.ts
|  ├── settings
│  │   |── react-app-env.d.ts
|  ├── web-vitals
│  │   |── reportWebVitals.ts
|  ├── App.scss
|  ├── App.tsx
|  ├── index.scss
|  ├── index.tsx
├── .editorconfig
├── .eslintignore
├── .eslintrc.js
├── .gitattributes
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
├── yarn.lock
~~~

</details>

## Install packages

You can install it by typing the following command in your terminal:

```
npm install video-stream-ascii
```

## Usage

To use the package, you need to import it into your project:

```js
import {VideoStreamAscii} from "video-stream-ascii";
```

Then you can create use the Component:

```js
<VideoAscii videoStreaming={videoRef.current!.video!}
            parentRef={parentRef}
            frameRate={30} charsPerLine={cameraWidth}
            charsPerColumn={cameraHeight}
            fontColor={'white'}
            backgroundColor={'black'}/>
```

To use the component, you need to pass the following props:

- `videoStreaming` - The video stream from the camera.
- `parentRef` - The reference of the parent element, to fit the ascii art in it.
- `frameRate` - The frame rate of the video output in frames per second.
- `charsPerLine` - The number of characters per line.
- `charsPerColumn` - The number of characters per column.
- `fontColor` - The color of the font.
- `backgroundColor` - The color of the background.

The `parentRef` is used to fit the ascii art in the parent element, so you need to pass the reference of the parent
element like a `div`, you can check the example to see how to use it.

> **Warning**  
> Be careful when using this package, the camera must be working before enabling the video stream.
> If you want to set the ascii art with a correct aspect ratio, follow the example below, for an example of how to use
> it.

An example in the GitHub repository is available, showing how to use the camera stream to convert it into a real-time
ASCII video
here: [video-ascii-example](https://github.com/Im-Rises/video-ascii/blob/main/src/components/CameraAsciiPanel.tsx).

You can also find it below:

<details>
    <summary>Click to expand</summary>

```js
import React, {useRef, useState} from 'react';
import VideoAscii from './VideoAscii';
import Webcam from 'react-webcam';
import './CameraAsciiPanel.css';

const CameraAsciiPanel = () => {
    // Define the ascii art chars per column according to ratio of the screen and the chars per line
    const screenRatio = screen.width / screen.height;
    const charsPerLine = 200;
    const charsPerColumn = screenRatio > 1 ? Math.floor(charsPerLine / screenRatio) : Math.floor(charsPerLine * screenRatio);
    const [cameraWidth, cameraHeight] = [charsPerLine, charsPerColumn];

    // Define the hook state for the webcam
    const [isCameraReady, setIsCameraReady] = useState(false);

    // Define the refs
    const videoRef = useRef < Webcam > (null);
    const parentRef = useRef < HTMLDivElement > (null);

    // Handle the webcam ready event
    const handleUserMedia = (stream: MediaStream) => {
        const video = videoRef.current
        !
    .
        video
        !;
        video.srcObject = stream;
        video.onloadedmetadata = async () => {
            await video.play();
            setIsCameraReady(true);
        };
    };

    // Tags of the webcam and video ascii element
    // Show the webcam only when it is ready, otherwise show a loading message
    return (
        <div className={'Camera-Ascii-Panel'} data-testid='camera-ascii-test' ref={parentRef}>
            <Webcam ref={videoRef}
                    style={{width: 0, height: 0}}
                    onUserMedia={handleUserMedia}
            />
            {isCameraReady ? (
                <VideoAscii videoStreaming={videoRef.current!.video!}
                            parentRef={parentRef}
                            frameRate={1000 / 30} charsPerLine={cameraWidth}
                            charsPerColumn={cameraHeight}
                            fontColor={'white'}
                            backgroundColor={'black'}/>
            ) : (
                <p className={'Camera-Ascii-Waiting'}>Camera not ready.<br/>Please wait...
                </p>)}
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

[![pages-build-deployment](https://github.com/Im-Rises/video-ascii/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/Im-Rises/video-ascii/actions/workflows/pages/pages-build-deployment)
[![Node.js CI](https://github.com/Im-Rises/video-ascii/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/Im-Rises/video-ascii/actions/workflows/node.js.yml)
[![ESLint](https://github.com/Im-Rises/video-ascii/actions/workflows/eslint.yml/badge.svg?branch=main)](https://github.com/Im-Rises/video-ascii/actions/workflows/eslint.yml)
[![CodeQL](https://github.com/Im-Rises/video-ascii/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/Im-Rises/video-ascii/actions/workflows/codeql.yml)
[![Node.js Package](https://github.com/Im-Rises/video-ascii/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/Im-Rises/video-ascii/actions/workflows/npm-publish.yml)

The project is set up to run the following actions:

- pages-build-deployment : Builds the website and deploys it to GitHub Pages.
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
on [![github](https://user-images.githubusercontent.com/59691442/223556058-6244e346-8117-43cd-97c6-bf68611bf286.svg)](https://github.com/im-rises/video-ascii)

Check the package
on [![npm](https://user-images.githubusercontent.com/59691442/223556055-4e9ef014-79d4-4136-ac07-b837b49066c8.svg)](https://www.npmjs.com/package/video-stream-ascii)

## Contributors

Quentin MOREL :

- @Im-Rises
- <https://github.com/Im-Rises>

[![GitHub contributors](https://contrib.rocks/image?repo=Im-Rises/video-ascii)](https://github.com/Im-Rises/video-ascii/graphs/contributors)
