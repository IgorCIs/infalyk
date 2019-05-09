const SameHeight = () => {
  setTimeout(() => {
    [...document.querySelectorAll('[data-same]')]
      .reduce((arr, next) => {
        return arr.map(item => item.dataset.same).includes(next.dataset.same) ? arr : [...arr, next]
      }, [])
      .forEach(selector => {
        const elements = document.querySelectorAll(`[data-same=${selector.dataset.same}]`)
        const maxHeight = Math.max(...[...elements].map(element => element.offsetHeight));
  
        [...elements].forEach(element => element.style.height = maxHeight + 'px')
      })
  }, 200)
}

export default SameHeight