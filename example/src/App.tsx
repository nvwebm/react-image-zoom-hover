import React from 'react'

import { ImageZoom } from 'react-image-zoom-hover'
import 'react-image-zoom-hover/dist/index.css'
import bigImage from 'react-image-zoom-hover/example/public/example.jpg' 
const App = () =>
{
  return <ImageZoom bigImage={bigImage}><img width="200" height="200"  src="example.jpg" className="image" alt="example_image" /></ImageZoom>
}

export default App
