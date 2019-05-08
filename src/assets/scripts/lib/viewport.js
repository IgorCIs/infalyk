const isInViewport = function (elem, offset) {
  const bounding = elem.getBoundingClientRect();
  return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight + offset || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

const appear = (element, callback, offset) => {
  const checkOnScroll = () => {
    if (isInViewport(element, offset)) {
      callback()
      document.removeEventListener('scroll', checkOnScroll)
    }
  }
  
  document.addEventListener('scroll', checkOnScroll)
}

export default appear