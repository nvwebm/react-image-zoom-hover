function calcRelationalPoint(
  point: number,
  relation: number,
  zoomContainerDimension: number,
  zoomImageDimension: number
): number {
  const zoomedPoint = point * relation - zoomContainerDimension / 2
  if (zoomImageDimension - zoomedPoint < zoomContainerDimension)
    return zoomImageDimension - zoomContainerDimension
  return zoomedPoint
}

export default calcRelationalPoint;