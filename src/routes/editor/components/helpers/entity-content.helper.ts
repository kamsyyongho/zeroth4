/** finds the location of the playing word on the screen and scrolls to keep it visible */
export const checkLocationOnScreenAndScroll = (
  referenceElement: HTMLDivElement | HTMLButtonElement | null,
  editorElement: Element | null,
  editorContentHeight = 0,
  windowHeight = 0,
  editorAutoScrollDisabled?: boolean,
) => {
  if (editorAutoScrollDisabled) return;
  const AUTO_SCROLL_AREA_RATIO = 1 / 3; // only the bottom portion of the editor
  const editorBottomScrollZone = editorContentHeight * AUTO_SCROLL_AREA_RATIO;
  const heightRange = editorContentHeight - editorBottomScrollZone;
  const nonScrollArea = (windowHeight - editorContentHeight) / 2; // only use the area above the editor

  // check the location and scroll accordingly
  if (referenceElement && nonScrollArea && editorElement && heightRange) {
    const { bottom, top } = referenceElement.getBoundingClientRect();
    const adjustedBottom = bottom - nonScrollArea;
    // scroll up if we are at the bottom
    if (
      adjustedBottom > heightRange &&
      editorContentHeight &&
      adjustedBottom < editorContentHeight
    ) {
      editorElement.scrollTo({
        behavior: 'smooth',
        top: editorElement.scrollTop + editorBottomScrollZone,
        left: 0,
      });
      // scroll up/down if it is off the screen
    } else if (
      (editorContentHeight && adjustedBottom > editorContentHeight) ||
      bottom  < 0
    ) {
      referenceElement.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  }
};
