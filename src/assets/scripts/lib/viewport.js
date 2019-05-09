const isInViewport = function (element, offset) {
  const bounding = element.getBoundingClientRect();
  return (
      bounding.top >= -10  &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight - offset || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
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
  
  document.addEventListener('scroll', checkOnScroll)
}

export default appear