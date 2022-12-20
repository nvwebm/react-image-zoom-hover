import { createRef, useState, useEffect, createElement } from 'react';

function getRealImageWidthAndHeight(img) {
  return {
    width: img.naturalWidth,
    height: img.naturalHeight
  };
}

function calcRelationalDimensions(img, dimensions) {
  const {
    width,
    height
  } = getRealImageWidthAndHeight(img);
  const relation = {
    width: width / dimensions.width,
    height: height / dimensions.height
  };
  return relation;
}

function calcRelationalPoint(point, relation, zoomContainerDimension, zoomImageDimension) {
  const zoomedPoint = point * relation - zoomContainerDimension / 2;
  if (zoomImageDimension - zoomedPoint < zoomContainerDimension) return zoomImageDimension - zoomContainerDimension;
  return zoomedPoint;
}

function getImageWidthAndHeight(img) {
  return {
    width: img.clientWidth,
    height: img.clientHeight
  };
}

const ImageZoom = ({
  children,
  bigImage
}) => {
  const imageContainerRef = createRef();
  const zoomContainerRef = createRef();
  const [relationalDimensions, setRelationalDimensions] = useState({
    width: 0,
    height: 0
  });
  const [zoomContainerDimension, setZoomContainerDimension] = useState({
    width: 0,
    height: 0
  });
  const [realImageDimensions, setRealImageDimensions] = useState({
    width: 0,
    height: 0
  });
  const [imageTag, setImageTag] = useState(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [zoomXPosition, setZoomXPosition] = useState(0);
  const [zoomYPosition, setZoomYPosition] = useState(0);
  const mouseEnter = () => setIsMouseOver(true);
  const mouseLeave = () => setIsMouseOver(false);
  const movement = (offsetX, offsetY) => {
    setZoomXPosition(offsetX);
    setZoomYPosition(offsetY);
  };
  const mouseMove = e => {
    const {
      offsetX,
      offsetY
    } = e;
    movement(offsetX, offsetY);
  };
  const touchMove = (e, left, top) => {
    const lastTouchEvent = e.changedTouches[e.changedTouches.length - 1];
    const offsetX = lastTouchEvent.pageX - left;
    const offsetY = lastTouchEvent.pageY - top;
    if (offsetX > zoomContainerDimension.width) setIsMouseOver(false);
    if (offsetY > zoomContainerDimension.height) setIsMouseOver(false);
    movement(offsetX, offsetY);
  };
  useEffect(() => {
    if (!imageTag) return;
    imageTag.addEventListener('mousemove', mouseMove);
    imageTag.addEventListener('mouseenter', mouseEnter);
    imageTag.addEventListener('mouseleave', mouseLeave);
    imageTag.addEventListener('touchstart', mouseEnter);
    imageTag.addEventListener('touchcancel', mouseLeave);
    imageTag.addEventListener('touchend', mouseLeave);
    const imagePagePosition = imageTag.getBoundingClientRect();
    const touchMoveHandler = e => touchMove(e, imagePagePosition.left, imagePagePosition.top);
    imageTag.addEventListener('touchmove', touchMoveHandler);
    const localDimensions = getImageWidthAndHeight(imageTag);
    const localRelationalDimensions = calcRelationalDimensions(imageTag, localDimensions);
    const realImageDiemsions = getRealImageWidthAndHeight(imageTag);
    setRelationalDimensions(localRelationalDimensions);
    setRealImageDimensions(realImageDiemsions);
    return () => {
      imageTag.removeEventListener('mouseenter', mouseEnter);
      imageTag.removeEventListener('mouseleave', mouseLeave);
      imageTag.removeEventListener('mousemove', mouseMove);
      imageTag.removeEventListener('touchstart', mouseEnter);
      imageTag.removeEventListener('touchcancel', mouseLeave);
      imageTag.removeEventListener('touchend', mouseLeave);
      imageTag.removeEventListener('touchmove', touchMoveHandler);
    };
  }, [imageTag]);
  useEffect(() => {
    if (!zoomContainerRef.current) return;
    const computedStyle = getComputedStyle(zoomContainerRef.current);
    setZoomContainerDimension({
      width: parseFloat(computedStyle.width),
      height: parseFloat(computedStyle.height)
    });
  }, [zoomContainerRef.current]);
  return createElement("div", {
    className: 'react-image-zoom-container',
    onLoad: () => setImageTag(imageContainerRef.current.children[0]),
    ref: imageContainerRef
  }, children, createElement("div", {
    className: 'react-image-zoom-inner-container',
    ref: zoomContainerRef,
    style: {
      display: isMouseOver ? 'block' : 'none',
      left: `${zoomXPosition + 5}px`,
      top: `${zoomYPosition + 5}px`
    }
  }, createElement("img", {
    alt: children.props.src,
    src: bigImage,
    className: "react-image-zoom-inner-zoomed-image",
    style: {
      top: `-${calcRelationalPoint(zoomYPosition, relationalDimensions.height, zoomContainerDimension.height, realImageDimensions.height)}px`,
      left: `-${calcRelationalPoint(zoomXPosition, relationalDimensions.width, zoomContainerDimension.width, realImageDimensions.width)}px`
    }
  })));
};

export { ImageZoom };
//# sourceMappingURL=index.modern.js.map
