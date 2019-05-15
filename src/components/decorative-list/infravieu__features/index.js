import $ from 'jquery'

const slickConfig = {
  slidesToShow: 1,
  dots: true,
  arrows: false,
  draggable: false,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 2000
}

export default () => { 
  const slider = $('#decorative-slider')
  const titles = document.querySelectorAll('#decorative-slider-titles li')
  
  if (slider.length) {
    if (titles.length) {
      titles[slickConfig.initialSlide].classList.add('active')
      slider.on('beforeChange', (_, __, ___, nextSlide) => {
        [...titles].forEach(title => title.classList.remove('active'))
        titles[nextSlide].classList.add('active')
      });
      
      [...titles].forEach((title, i) =>
        title.addEventListener('click', () => slider.slick('slickGoTo', i))
      )
    }
        
    slider.slick(slickConfig)
  }
}