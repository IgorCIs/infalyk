import { throttle } from 'throttle-debounce'

let lastBoundingY = null 

const isInViewport = function (element, offset = {}, bottom) {
  const bounding = element.getBoundingClientRect();

  return (
      bounding.top >= -10  &&
      bounding.left + (offset.left || 0) >= 0 &&
      bounding.bottom <= (bottom ? Infinity : (window.innerHeight - (offset.bottom || 0) || document.documentElement.clientHeight)) &&
      bounding.right - (offset.right || 0) <= (window.innerWidth || document.documentElement.clientWidth)
  ) || bounding.top < -10
}


const appear = (element, callback, offset, bottom) => {
  let scrollCb = f=>f
    
  window.listenElement = (element) => {
    document.addEventListener('scroll', () => {
      const bounding = element.getBoundingClientRect()

      console.log(bounding)
      console.log (
        bounding.top >= -10  &&
        bounding.left + 0 >= 0 &&
        bounding.bottom <= (bottom ? Infinity : (window.innerHeight - 0 || document.documentElement.clientHeight)) &&
        bounding.right -  0 <= (window.innerWidth || document.documentElement.clientWidth)
      )
    })
  }

  const checkOnScrolled = () => { 
    if(element.getBoundingClientRect().bottom < 0) {
      callback()
      return true
    } 
    return false
  }
  
  const checkOnScroll = () => {
    if (isInViewport(element, offset, bottom)) {
      document.removeEventListener('scroll', scrollCb)
      callback()

      return true
    }
  }
  
  scrollCb = throttle(100, checkOnScroll)
  window.scrollCb = scrollCb 
  
  if(!checkOnScrolled()) { 
    if(!checkOnScroll()) {
      document.addEventListener('scroll', scrollCb)
    }
  }
}
export default appear