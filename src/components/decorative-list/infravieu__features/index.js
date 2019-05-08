import $ from 'jquery'

const slickConfig = {
  slidesToShow: 1,
  dots: true,
  arrows: false,
  draggable: false,
  initialSlide: 0,
}

export default () => { 
  const slider = $('#infravieu-features')
  
  if (slider.length) {
    const titles = document.querySelectorAll('#infravieu-features-titles li')
    
    titles[slickConfig.initialSlide].classList.add('active')
    
    slider.on('beforeChange', (_, __, ___, nextSlide) => {
      [...titles].forEach(title => title.classList.remove('active'))
      titles[nextSlide].classList.add('active')
    });

    [...titles].forEach((title, i) =>
    title.addEventListener('click', () => slider.slick('slickGoTo', i))
    )
    
    slider.slick(slickConfig)
  }
}