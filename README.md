# video-stream-ascii

<p align="center">
    <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="typescriptLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="reactLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="scssLogo" style="height:50px;">
    <img src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white" alt="cssLogo" style="height:50px;">
</p>

## Description

This is a simple web package that converts a video stream into ASCII art for React.

## 🚀🚀🚀 [The package is published on npm](https://www.npmjs.com/package/video-stream-ascii) 🚀🚀

It works on desktop and mobile as well, there is two demos, one for the camera and one for video files input.
You can check them at those links:

### 🚀🚀 [Video Ascii Webcam](https://im-rises.github.io/video-stream-ascii-webcam/) 🚀🚀

### 🚀🚀 [Video Ascii Player](https://im-rises.github.io/video-stream-ascii-player/) 🚀🚀

The source code of the examples is available on GitHub:

- [Video Ascii Webcam](https://github.com/Im-Rises/video-stream-ascii-webcam)
- [Video Ascii Player](https://github.com/Im-Rises/video-stream-ascii-player)

## Image to ASCII art version

I also made a version for images, you can check it at this link:  
<https://github.com/Im-Rises/image-ascii-art>

You can check the demo at this link:  
<https://im-rises.github.io/image-ascii-art-website>

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

Then you can create use the Component like this in Typescript/JavaScript:

```js
<VideoAscii
    videoStreaming={videoRef.current!.video!}
    parentRef={parentRef}
    artType={ArtTypeEnum.ASCII_COLOR_BG_IMAGE}
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
    artType={ArtTypeEnum.ASCII_COLOR_BG_IMAGE}
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
- `artType` - The type of the ascii art, you can choose between `ASCII`, `ASCII_COLOR` and `ASCII_COLOR_BG_IMAGE`.
- `charsPerLine` - The number of characters per line.
- `charsPerColumn` - The number of characters per column.
- `fontColor` - The color of the font.
- `backgroundColor` - The color of the background.
- `preTagRef` - The reference of the pre tag, to get the ascii art text.

The `parentRef` is used to fit the ascii art in the parent element, so you need to pass the reference of the parent
element like a `div`, you can check the example to see how to use it.

> **Warning**  
> Be careful when using this package, the camera must be working before enabling the video stream.
> If you want to set the ascii art with a correct aspect ratio, follow the examples (webcam or video player).

The `artType` is used to choose the type of the ascii art, you can choose between `ASCII`, `ASCII_COLOR`
and `ASCII_COLOR_BG_IMAGE`.

- `ASCII` - The ascii art will be defined only by two colors the font color and the background color. (which you can set
  with the props `fontColor` and `backgroundColor`).
- `ASCII_COLOR` - The ascii art will be printed with each character having the color of the pixel it represents (it is
  an extensive mode, you should use the `ASCII_COLOR_BG_IMAGE` mode instead).
- `ASCII_COLOR_BG_IMAGE` - The ascii art will be printed with color using the original image as background for the color
  of the characters, you should use this mode if you want good performance instead of the `ASCII_COLOR` mode.

> **Note**
> Be sure to import the enum `ArtTypeEnum` from the package, to use it in your code.

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
