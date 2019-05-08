export default function animateNode(element, animationName, callback) {
  const node = element
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
      node.classList.remove('animated', animationName)

      if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', () => handleAnimationEnd(), true)
  node.addEventListener('webkitAnimationEnd', () => handleAnimationEnd(), true)
}

export function animate(active, elements, cb) {
  if(active)
    elements.forEach(item => {
      if(item) animateNode(item, item.dataset.animation, cb)
    })
}