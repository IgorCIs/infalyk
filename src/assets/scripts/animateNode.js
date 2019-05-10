import appear from "./lib/viewport";
import anime from 'animejs';

const ANIMATE_ENABLED = true

const animations = {
  fadeDown: [
    {
      translateY: -90,
      duration: 0
    },
    {
      translateY: 0,
      opacity: 1,
      easing: 'easeInOutExpo',
      duration: 1000
    }
  ],
  fadeDownMini: [
    {
      opacity: 0,
      translateY: -20,
      duration: 0
    },
    {
      opacity: 1,
      duration: 1000,
      translateY: 0
    }
  ],
  fromOpacity: [
    {
      opacity: 0,
      duration: 0
    },
    {
      opacity: 1,
      easing: 'easeInOutExpo'
    }
  ],
  leftTitle: [
    {
      translateX: -100,
      duration: 0
    },
    {
      translateX: 0,
      duration: 1500
    },
  ]
}


const initNode = (node, animation) => {
  anime(Object.assign({
    targets: node,
    duration: 0
  }, animations[animation][0]))
}

const animateNode = (node, animation, instant = false, delay = 0) => {
  const animationByName = animations[animation]

  animationByName.forEach((an, i) => {
    if (i > 0 || instant) {
      anime(Object.assign({
        targets: node,
        delay: delay,
        easing: 'easeInOutExpo'
      }, an))
    } 
  })
}



export default () => {
  const elementsForAnimation = [...document.querySelectorAll('[data-animation]')]
  elementsForAnimation.forEach(element => {
    if (ANIMATE_ENABLED) {
      !element.dataset.instant && initNode(element, element.dataset.animation)
      appear(element, () => animateNode(element, element.dataset.animation, element.dataset.instant, element.dataset.delay), {bottom: 100, left: 100})
    } 
  })
}

