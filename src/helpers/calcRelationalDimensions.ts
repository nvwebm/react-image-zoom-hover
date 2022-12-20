import Dimensions from '../interfaces/Dimensions'
import getRealImageWidthAndHeight from './getImageRealWidthAndHeight'

function calcRelationalDimensions(
  img: HTMLImageElement,
  dimensions: Dimensions
): Dimensions {
  const { width, height } = getRealImageWidthAndHeight(img)
  const relation = {
    width: width / dimensions.width,
    height: height / dimensions.height
  }
  return relation
}

export default calcRelationalDimensions
