import { createRef, useState, useEffect, createElement } from 'react';

function getRealImageWidthAndHeight(img) {
  return {
    width: img.naturalWidth,
    height: img.naturalHeight
  };
}

function calcRelationalDimensions(img, dimensions) {
  var _getRealImageWidthAnd = getRealImageWidthAndHeight(img),
    width = _getRealImageWidthAnd.width,
    height = _getRealImageWidthAnd.height;
  var relation = {
    width: width / dimensions.width,
    height: height / dimensions.height
  };
  return relation;
}

function calcRelationalPoint(point, relation, zoomContainerDimension, zoomImageDimension) {
  var zoomedPoint = point * relation - zoomContainerDimension / 2;
  if (zoomImageDimension - zoomedPoint < zoomContainerDimension) return zoomImageDimension - zoomContainerDimension;
  return zoomedPoint;
}

function getImageWidthAndHeight(img) {
  return {
    width: img.clientWidth,
    height: img.clientHeight
  };
}

var ImageZoom = function ImageZoom(_ref) {
  var children = _ref.children,
    bigImage = _ref.bigImage;
  var imageContainerRef = createRef();
  var zoomContainerRef = createRef();
  var _React$useState = useState({
      width: 0,
      height: 0
    }),
    relationalDimensions = _React$useState[0],
    setRelationalDimensions = _React$useState[1];
  var _React$useState2 = useState({
      width: 0,
      height: 0
    }),
    zoomContainerDimension = _React$useState2[0],
    setZoomContainerDimension = _React$useState2[1];
  var _React$useState3 = useState({
      width: 0,
      height: 0
    }),
    realImageDimensions = _React$useState3[0],
    setRealImageDimensions = _React$useState3[1];
  var _React$useState4 = useState(null),
    imageTag = _React$useState4[0],
    setImageTag = _React$useState4[1];
  var _React$useState5 = useState(false),
    isMouseOver = _React$useState5[0],
    setIsMouseOver = _React$useState5[1];
  var _React$useState6 = useState(0),
    zoomXPosition = _React$useState6[0],
    setZoomXPosition = _React$useState6[1];
  var _React$useState7 = useState(0),
    zoomYPosition = _React$useState7[0],
    setZoomYPosition = _React$useState7[1];
  var mouseEnter = function mouseEnter() {
    return setIsMouseOver(true);
  };
  var mouseLeave = function mouseLeave() {
    return setIsMouseOver(false);
  };
  var mouseMove = function mouseMove(e) {
    var offsetX = e.offsetX,
      offsetY = e.offsetY;
    setZoomXPosition(offsetX);
    setZoomYPosition(offsetY);
  };
  useEffect(function () {
    if (!imageTag) return;
    imageTag.addEventListener('mousemove', mouseMove);
    imageTag.addEventListener('mouseenter', mouseEnter);
    imageTag.addEventListener('mouseleave', mouseLeave);
    var localDimensions = getImageWidthAndHeight(imageTag);
    var localRelationalDimensions = calcRelationalDimensions(imageTag, localDimensions);
    var realImageDiemsions = getRealImageWidthAndHeight(imageTag);
    setRelationalDimensions(localRelationalDimensions);
    setRealImageDimensions(realImageDiemsions);
    return function () {
      imageTag.removeEventListener('mouseenter', mouseEnter);
      imageTag.removeEventListener('mouseleave', mouseLeave);
      imageTag.removeEventListener('mousemove', mouseMove);
    };
  }, [imageTag]);
  useEffect(function () {
    if (!zoomContainerRef.current) return;
    var computedStyle = getComputedStyle(zoomContainerRef.current);
    setZoomContainerDimension({
      width: parseFloat(computedStyle.width),
      height: parseFloat(computedStyle.height)
    });
  }, [zoomContainerRef.current]);
  return createElement("div", {
    className: 'react-image-zoom-container',
    onLoad: function onLoad() {
      return setImageTag(imageContainerRef.current.children[0]);
    },
    ref: imageContainerRef
  }, children, createElement("div", {
    className: 'react-image-zoom-inner-container',
    ref: zoomContainerRef,
    style: {
      display: isMouseOver ? 'block' : 'none',
      left: zoomXPosition + 5 + "px",
      top: zoomYPosition + 5 + "px"
    }
  }, createElement("img", {
    alt: children.props.src,
    src: bigImage,
    className: "react-image-zoom-inner-zoomed-image",
    style: {
      top: "-" + calcRelationalPoint(zoomYPosition, relationalDimensions.height, zoomContainerDimension.height, realImageDimensions.height) + "px",
      left: "-" + calcRelationalPoint(zoomXPosition, relationalDimensions.width, zoomContainerDimension.width, realImageDimensions.width) + "px"
    }
  })));
};

export { ImageZoom };
//# sourceMappingURL=index.modern.js.map
