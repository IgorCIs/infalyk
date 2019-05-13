import $ from 'jquery'

const slickConfigBig = {
  slidesToShow: 1,
  arrows: true,
  fade: true,
}

const slickConfigText = {
  slidesToShow: 1,
  dots: true,
  arrows: false,
  fade: true,
}

const slickConfigSmall = {
  slidesToShow: 3,
  arrows: false,
  draggable: false,
  initialSlide: 1,
  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 2,
      }
    },
  ]
}

export default () => { 
  const bigSlider = $('#drone-client-big-slider')
  const smallSlider = $('#drone-client-slider')
  const textSlider = $('#drone-client-text-slider')  
  const next = document.querySelector('#drone-client-slider-buttons .next')
  const prev =  document.querySelector('#drone-client-slider-buttons .prev')

  const svgImage = document.querySelector('.drone__client-features #slider-image image')
  const images = [...document.querySelectorAll('#drone-client-slider img')]
                  .map(img => img.src)
  
  if (bigSlider.length && smallSlider.length && textSlider.length) {  
    textSlider.on('beforeChange', (event, slick, current, next) => {
      svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', images[next])
      smallSlider.slick('slickGoTo', next + 1)
      bigSlider.slick('slickGoTo', next)
    })  

    next.addEventListener('click', () => {
      textSlider.slick('slickNext')
    })


    prev.addEventListener('click', () => {
      textSlider.slick('slickPrev')
    })
          
    smallSlider.slick(slickConfigSmall)
    bigSlider.slick(slickConfigBig)
    textSlider.slick(slickConfigText)
  }
}