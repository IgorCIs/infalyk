import anime from 'animejs'
const building = document.querySelector('#building-animation svg')

export default !building ? f=>f : () => {
  const paths = [...building.querySelectorAll('path')]


  paths.forEach((path, i) => {
    let duration = i

    if(duration < 5) {
      duration+= 5
    }

    while(duration > 10) duration-=5

    duration+=Math.random() * 10
    
    path.style.transform = 'translateY(-100px)'

    setTimeout(() => {
      path.style['will-change'] = 'transform'
      path.style.transition = `all ${duration * 0.3}s`
      path.style.transform = 'translateY(0)'
    }, 500);

    setTimeout(() => {
      path.style.transition = `unset`
      path.style.transform = 'translateY(0)'
    }, 500);
  })
}