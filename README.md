# react-image-zoom

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/react-image-zoom.svg)](https://www.npmjs.com/package/react-image-zoom-hover) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Preview

[![Preview](./preview.gif)]

## Install

```bash
npm install --save react-image-zoom-hover
```

## Usage

```tsx
import React from 'react'

import { ImageZoom } from 'react-image-zoom'
import 'react-image-zoom/dist/index.css'
import bigImage from 'react-image-zoom-hover/example/public/example.jpg' 
const App = () =>
{
  return <div class="center"><ImageZoom bigImage={bigImage}><img width="200" height="200"  src="example.jpg" className="image" alt="example_image" /></ImageZoom></div>
}

export default App

```
## ChangeLog

1.1 Support for mobile was added.

## License

MIT © [nvwebm](https://github.com/nvwebm)
