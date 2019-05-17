export default () => {
  const container = document.querySelector('#data-source-svg')
  const elementForTriggerAnimate = document.querySelector('.data-source-svg__item:last-child')

  if(container) elementForTriggerAnimate.addEventListener('animationend', () => {
    container.classList.remove('animate')
    setTimeout(() => {
      container.classList.add('animate')
    }, 200);
  })
}