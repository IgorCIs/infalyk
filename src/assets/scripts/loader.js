const classes = {
  loader: '.page-loader',
  loaderHidden: 'page-loader--hidden'
}

const hide = () => {
  const loader = document.querySelector(classes.loader)

  console.log(loader)
  loader.classList.add(classes.loaderHidden)
  setTimeout(() => loader.style.display = 'none', 1500)
}

export default () => {
  window.addEventListener('load', hide)
}