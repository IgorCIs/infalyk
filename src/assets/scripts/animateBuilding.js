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

    
    
    // anime({
    //   targets: path,
    //   translateY: -200,
    //   duration: 0
    // })
    duration+=Math.random() * 10
    
    
    
    
    // anime({
      //   targets: path,
      //   translateY: 0,
      //   easing: 'easeOutQuint',
      //   duration: duration * 1000 * 0.3 
      // })
      
      // if(Math.random() > 0.3) {
      path.style.transform = 'translateY(-100px)'
  
      setTimeout(() => {
        
          path.style['will-change'] = 'transform'
          path.style.transition = `all ${duration * 0.3}s`
          path.style.transform = 'translateY(0)'
          
        }, 500);
      // } else {
      //   path.style.fill = 'transparent'
      //   setTimeout(() => {
      //     path.style.transition = `all ${duration * 2}s`
      //     path.style.fill = '#9a9b9b'
      //   }, 500);
        

      // }
  })
}