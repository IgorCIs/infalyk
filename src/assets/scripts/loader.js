const loader = document.querySelector('.loader')

export default !loader ? f=>f : () => loader.classList.add('loaded')