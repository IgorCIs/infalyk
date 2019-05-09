import $ from 'jquery'

const slickConfig = {
  slidesToShow: 1,
  dots: true,
  arrows: false,
  // draggable: false,
  fade: true,
  autoplay: true
}

export default () => { 
  const slider = $('#drone-pilot-slider')
        
  slider.slick(slickConfig)
}