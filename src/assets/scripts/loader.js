const loader = document.querySelector('.loader')

export default () => {
  if (loader) {
    loader.classList.add('loaded')
    setTimeout(() => {
        loader.style.display = 'none'
    }, 500);
  }
}