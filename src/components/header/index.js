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
  
  if (scrolled) {
    [...document.querySelectorAll('.header__nav__item.header__nav__item_has-child.active')]
    .forEach(item => item.classList.remove('active'))
  }
  
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