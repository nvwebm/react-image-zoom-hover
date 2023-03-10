import * as React from 'react'
import calcRelationalDimensions from './helpers/calcRelationalDimensions';
import calcRelationalPoint from './helpers/calcRelationalPoint';
import getRealImageWidthAndHeight from './helpers/getImageRealWidthAndHeight';
import getImageWidthAndHeight from './helpers/getImageWidthAndHeight';
import Dimensions from './interfaces/Dimensions';
interface Props
{
  children: React.ReactHTMLElement<HTMLImageElement>;
  bigImage: string;
}

export const ImageZoom = ({ children, bigImage }: Props) =>
{
  const imageContainerRef = React.createRef<HTMLDivElement>();
  const zoomContainerRef = React.createRef<HTMLDivElement>();
  const [relationalDimensions, setRelationalDimensions] = React.useState<Dimensions>({ width: 0, height: 0 });
  const [zoomContainerDimension, setZoomContainerDimension] = React.useState<Dimensions>({ width: 0, height: 0 });
  const [realImageDimensions, setRealImageDimensions] = React.useState<Dimensions>({ width: 0, height: 0 });

  const [imageTag, setImageTag] = React.useState<HTMLImageElement>(null as unknown as HTMLImageElement);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const [zoomXPosition, setZoomXPosition] = React.useState(0);
  const [zoomYPosition, setZoomYPosition] = React.useState(0);
  const mouseEnter = () => setIsMouseOver(true);
  const mouseLeave = () => setIsMouseOver(false);
  const movement = (offsetX: number, offsetY: number) =>
  {
    setZoomXPosition(offsetX);
    setZoomYPosition(offsetY);
  }
  const mouseMove = (e: MouseEvent) =>
  {
    const { offsetX, offsetY } = e;
    movement(offsetX, offsetY);
  }
  const touchMove = (e: TouchEvent, left: number, top: number) =>
  {
    const lastTouchEvent = e.changedTouches[e.changedTouches.length - 1];
    const offsetX = lastTouchEvent.pageX - left;
    const offsetY = lastTouchEvent.pageY - top;
    if (offsetX > zoomContainerDimension.width) setIsMouseOver(false);
    if (offsetY > zoomContainerDimension.height) setIsMouseOver(false);

    movement(offsetX, offsetY);
  }

  React.useEffect(() =>
  {
    if (!imageTag) return;
    imageTag.addEventListener('mousemove', mouseMove);
    imageTag.addEventListener('mouseenter', mouseEnter);
    imageTag.addEventListener('mouseleave', mouseLeave);
    imageTag.addEventListener('touchstart', mouseEnter);
    imageTag.addEventListener('touchcancel', mouseLeave);
    imageTag.addEventListener('touchend', mouseLeave);

    const imagePagePosition = imageTag.getBoundingClientRect();
    const touchMoveHandler = (e: TouchEvent) => touchMove(e, imagePagePosition.left, imagePagePosition.top);
    imageTag.addEventListener('touchmove', touchMoveHandler);

    const localDimensions = getImageWidthAndHeight(imageTag);
    const localRelationalDimensions = calcRelationalDimensions(imageTag, localDimensions);
    const realImageDiemsions = getRealImageWidthAndHeight(imageTag);
    setRelationalDimensions(localRelationalDimensions);
    setRealImageDimensions(realImageDiemsions);

    return () =>
    {
      imageTag.removeEventListener('mouseenter', mouseEnter);
      imageTag.removeEventListener('mouseleave', mouseLeave);
      imageTag.removeEventListener('mousemove', mouseMove);
      imageTag.removeEventListener('touchstart', mouseEnter);
      imageTag.removeEventListener('touchcancel', mouseLeave);
      imageTag.removeEventListener('touchend', mouseLeave);
      imageTag.removeEventListener('touchmove', touchMoveHandler);
    }
  }, [imageTag]);
  React.useEffect(() =>
  {
    if (!zoomContainerRef.current) return;
    const computedStyle = getComputedStyle(zoomContainerRef.current);
    setZoomContainerDimension({ width: parseFloat(computedStyle.width), height: parseFloat(computedStyle.height) });

  }, [zoomContainerRef.current])
  return (
    <div
      className='react-image-zoom-container'
      onLoad={() => setImageTag(imageContainerRef!.current!.children[0] as HTMLImageElement)}
      ref={imageContainerRef}
    >
      {children}
      <div
        className='react-image-zoom-inner-container'
        ref={zoomContainerRef}
        style={
          {
            display: isMouseOver ? 'block' : 'none',
            left: `${zoomXPosition + 5}px`,
            top: `${zoomYPosition + 5}px`
          }}>
        <img alt={children.props.src} src={bigImage} className="react-image-zoom-inner-zoomed-image" style={{
          top: `-${calcRelationalPoint(zoomYPosition, relationalDimensions.height, zoomContainerDimension.height, realImageDimensions.height)}px`,
          left: `-${calcRelationalPoint(zoomXPosition, relationalDimensions.width, zoomContainerDimension.width, realImageDimensions.width)}px`,

        }} />
      </div>
    </div>)
}
