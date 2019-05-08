export default () => {
  const header = document.querySelector('.header')
  const delta = 10
  const headerHeight = header.offsetHeight
  
  let lastScrollTop
  let didScroll
  
  const scrollTrigger = () => didScroll = true
   
  const hasScrolled = () => {
    const scrollTop = window.scrollY
    
    if (Math.abs(lastScrollTop - scrollTop) <= delta) return

    const scrolled = scrollTop > lastScrollTop && scrollTop > headerHeight

    header.classList[scrolled ? 'remove' : 'add']('sticky')
    
    lastScrollTop = scrollTop
  }

  setInterval(() => {
    if (didScroll) {
        hasScrolled()
        didScroll = false
    }
  }, 250)

  document.addEventListener('scroll', scrollTrigger)
}