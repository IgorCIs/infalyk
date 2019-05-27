const isInViewport = function (element, offset = {}, bottom) {
  const bounding = element.getBoundingClientRect();
  return (
      bounding.top >= -10  &&
      bounding.left + (offset.left || 0) >= 0 &&
      bounding.bottom <= (bottom ? Infinity : (window.innerHeight - (offset.bottom || 0) || document.documentElement.clientHeight)) &&
      bounding.right - (offset.right || 0) <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const appear = (element, callback, offset, bottom) => {
  const checkOnScroll = () => {
    if (isInViewport(element, offset, bottom)) {
      document.removeEventListener('scroll', checkOnScroll)
      callback()

      return true
    }
  }
  
  if(!checkOnScroll()) document.addEventListener('scroll', checkOnScroll)
}

export default appear