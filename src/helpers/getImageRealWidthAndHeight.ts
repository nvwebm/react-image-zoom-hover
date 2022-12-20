import Dimensions from "../interfaces/Dimensions";

function getRealImageWidthAndHeight(img: HTMLImageElement): Dimensions {
  return {
    width: img.naturalWidth,
    height: img.naturalHeight
  }
}

export default getRealImageWidthAndHeight;