import $ from 'jquery'
import slick from 'slick-carousel'

export default () => {
  const slider = $('#homepage-slider')

  if (slider.length) {
    const prev = document.querySelector('.homepage__slider__button--prev')
    const next = document.querySelector('.homepage__slider__button--next')

    slider.slick({
      slidesToShow: 3,
      infinite: true,
      draggable: false
    })
    
    next.addEventListener('click',  () => slider.slick('slickNext'))
    prev.addEventListener('click', () => slider.slick('slickPrev'))
  }
}