const isInViewport = function (element, offset) {
  const bounding = element.getBoundingClientRect();
  return (
      bounding.top >= -10  &&
      bounding.left + (offset.left || 0) >= 0 &&
      bounding.bottom <= (window.innerHeight - (offset.top || 0) || document.documentElement.clientHeight) &&
      bounding.right - (offset.right || 0) <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const appear = (element, callback, offset) => {
  const checkOnScroll = () => {
    if (isInViewport(element, offset)) {
      callback()
      document.removeEventListener('scroll', checkOnScroll)

      return true
    }
  }
  
  if(!checkOnScroll()) document.addEventListener('scroll', checkOnScroll)
}

export default appear