import appear from "./lib/viewport";

export function animateNode(node, animationName, callback) {
  node.classList.add('animated', animationName)
    

  function handleAnimationEnd() {
      if (typeof callback === 'function') callback(node)
  }

  node.addEventListener('animationend', () => handleAnimationEnd(), true)
  node.addEventListener('webkitAnimationEnd', () => handleAnimationEnd(), true)
}

export default () => {
  const elementsForAnimation = [...document.querySelectorAll('[data-animation]')]
  elementsForAnimation.forEach(element => {
    element.classList.add(element.dataset.animation)
    appear(element, () => animateNode(element, element.dataset.animation), 100)
  })
}