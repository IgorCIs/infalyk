import './lib/reveal'
import appear from './lib/viewport';
import { WOW } from 'wowjs'

export default () => {
  new WOW({
    offset: 200
  }).init()

  let blocks = document.querySelectorAll('[data-reveal="block"]');
  blocks = [...blocks, ...document.querySelectorAll('.image-with-box')];
  
  [...blocks].forEach(block => {
    const rev = new RevealFx(block, {
      revealSettings : {
        bgcolor: block.dataset.color || '#222',
        onCover: function(contentEl, revealerEl) {
          contentEl.style.opacity = 1;
        },
        direction: block.dataset.dir || 'lr',
        delay: block.dataset.delay || 0
      }
    })


    appear(block, () => rev.reveal(), 200)
  })


  try {
    const fields = document.querySelectorAll('.nf-field-element');
    setTimeout(() => {
      [...fields].forEach(field => {
        field.appendChild(document.createElement('div'))
      })
    }, 10)
  } catch(e) {
    console.log(e)
  }
}