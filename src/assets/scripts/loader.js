const loader = document.querySelector('.loader')

export default () => {
  console.log('whii')
  if (loader) {
    loader.classList.add('loaded')
  }
}