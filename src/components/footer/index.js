const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const form = document.querySelector('#footer-form')


export default !form ? f=>f : () => {
  const input = form.querySelector('input')
  const button = form.querySelector('.btn')

  const fail = () => {
    form.classList.add('fail')
  }

  const done = () => {
    form.classList.remove('fail')
    form.classList.add('done')
  }
  
  const checkField = (e) => {
    e.preventDefault()
    reg.test(input.value) ?
      done() :
      fail()
  }

  
  button.addEventListener('click', checkField)
  form.addEventListener('submit', checkField)
}