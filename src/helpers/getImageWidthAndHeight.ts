import Dimensions from '../interfaces/Dimensions'

function getImageWidthAndHeight(img: HTMLImageElement): Dimensions {
  return {
    width: img.clientWidth,
    height: img.clientHeight
  }
}
export default getImageWidthAndHeight
