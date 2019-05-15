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
  ],
  rightTitle: [
    {
      translateX: 100,
      duration: 0
    },
    {
      translateX: 0,
      duration: 1500
    },
  ],
  articleTitleLeft: [
    {
      translateX: -50,
      opacity: 0
    },
    {
      translateX: 0,
      opacity: 1,
      duration: 1500
    },
  ],
  articleTitleRight: [
    {
      translateX: 50,
      opacity: 0
    },
    {
      translateX: 0,
      opacity: 1,
      duration: 1500
    },
  ]
}

const initNode = (node, animation) => {
  anime(Object.assign({
    targets: node,
    duration: 0,
    easing: 'easeOutQuint',
  }, animations[animation][0]))
}

const animateNode = (node, animation, instant = false, delay = 0) => {
  animations[animation].forEach((an, i) => {
    if (i > 0 || instant) {
      anime(Object.assign({
        targets: node,
        delay: delay,
        easing: 'easeOutQuint',
      }, an))
    } 
  })
}



export default () => {
  const elementsForAnimation = [...document.querySelectorAll('[data-animation]')]
  elementsForAnimation.forEach(element => {
    if (ANIMATE_ENABLED) {
      !element.dataset.instant && initNode(element, element.dataset.animation)
      appear(element, () => animateNode(element, element.dataset.animation, element.dataset.instant, element.dataset.delay), {bottom: -150, left: 100, right: 100})
    } 
  });

  [...document.querySelectorAll('[data-apear]')].forEach(element => {
    appear(element, () => element.classList.add(element.dataset.apear))
  })
}

  