import anime from 'animejs'
const element = document.querySelector('#lines-animation svg')
const container = document.querySelector('.cases__banner .lidar__banner__wrapper')

export default !element ? f=>f :  () => {
  const groups = element.querySelectorAll('g g g')
  
  const groupAnimStart = () => new Promise((resolve, reject) => {
    groups.forEach((group, i) => {
      const delay = (i > 30 ? (i - 30) : i) * 200;
      [...group.querySelectorAll('rect')].forEach((targets) => {
        const width  = targets.attributes.width.nodeValue
        const height = targets.attributes.height.nodeValue
        targets.prevAttr = { width, height }
        const way = width > height ? 'width' : 'height'
        
        anime({
          targets,
          delay,
          duration: 800,
          [way]: [way === 'width' ? width : height, '0'],
          easing: 'easeInSine',
          complete: () => i === groups.length - 1 && resolve()    
        })
      });

      [...group.querySelectorAll('circle, path, ellipse')].forEach((targets) => {
        anime({
          targets,
          delay,
          duration: 500,
          easing: 'easeInSine',    
          opacity: [1, 0]
        })      
      })
    })
  })

  const groupAnimeMiddle = () => {
    anime({
      targets: element,
      translateX: ['0', `-${container.offsetWidth - element.scrollWidth  + element.scrollWidth / 4}`],
      duration: 0,
    })
  }

  const groupAnimeEnd =() => {
    anime({
      targets: element,
      easing: 'easeInSine',
      duration: 10000,
    })

    groups.forEach((group, i) => {
      const delay = (i > 30 ? (i - 30) : i) * 200;
      [...group.querySelectorAll('rect')].forEach((targets) => {
        const { width, height } = targets.prevAttr
        const way = width > height ? 'width' : 'height'
        
        anime({
          targets,
          delay,
          duration: 800,
          [way]: ['0', way === 'width' ? width : height],
          easing: 'easeInSine'
        })
      });

      [...group.querySelectorAll('circle, path, ellipse')].forEach((targets) => {
        anime({
          targets,
          delay,
          duration: 500,
          easing: 'easeInSine',    
          opacity: [0, 1]
        })      
      })
    })
  }

  const linesGoStart = () => new Promise((resolve, reject) => {
    const iterationsCount = window.innerWidth / 384
    
    const animThis = (iteration = 0) => new Promise(resolve => groups.forEach((group, i) => {
      console.log(iteration, iterationsCount)
      const delay = (i > 30 ? (i - 30) : i) * 200;
      
      [...group.querySelectorAll('rect')].forEach((targets) => {
        const width  = targets.attributes.width.nodeValue
        const height = targets.attributes.height.nodeValue

        const way = width > height ? 'width' : 'height'
        const wayValue = way === 'width' ? width : height
        if(i === 1) console.dir(targets)

        anime({
          targets,
          delay,
          duration: 4000,
          [way]: [wayValue, '0', wayValue],
          translateX: [-wayValue * iteration, -wayValue * iteration, -wayValue * (iteration + 1)],
          easing: 'easeInSine',
          complete: () =>  i === groups.length - 1 && iteration < iterationsCount - 1 &&  animThis(++iteration)
        });
        
        [...targets.parentNode.querySelectorAll('circle, path, ellipse')].forEach((item => {
          anime({
            delay,
            targets: item,
            duration: 4000,
            translateX: [-wayValue * iteration, -wayValue * iteration, -wayValue * (iteration + 1)],
            easing: 'easeInSine',
            opacity: [1, 0, 0,  1]
          })
        }))
      });
    }));

    animThis()
  })

  linesGoStart()
  
  // groupAnimStart().then(() => {
  //   groupAnimeMiddle()
  //   groupAnimeEnd()
  // })


  

  
  // anime({
  //   targets: element,
  //   translateX: ['0', `-${container.offsetWidth - element.scrollWidth  + element.scrollWidth / 4}`],
  //   opacity: ['1', '0', '1'],
  //   // rotate: ['0deg', `${360 * 3}deg`],
  //   // duration: 10000,
  //   easing: 'easeInSine',    
  // })
}