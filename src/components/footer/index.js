const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const form = document.querySelector('#footer-form')

const headers = new Headers()
headers.append("Content-type", "application/json");
headers.append("Access-Control-Allow-Origin", "*");
headers.append("Origin", "localhost");


const requestConfig = {
  link: "https://api.allorigins.win/get?url=https://us16.api.mailchimp.com/3.0/lists/ec19d0aa44/members?apikey=60318c2da9e685b179f84c2800727b0d&c=?",
  options: {
    headers,
    mode: 'no-cors',
    credentials: 'same-origin'
  }
}


export default !form ? f=>f : () => {
  const input = form.querySelector('input')
  const button = form.querySelector('.btn')

  const wrong = () => {
    form.classList.add('fail')
  }

  const done = () => {
    form.classList.remove('fail')
    form.classList.add('done')
  }
  
  const fail = () => {
    
  }
  
  const send = () => {


    // fetch(requestConfig.link, requestConfig.options)
    //   .then(res => res)
    //   .then(res => console.log(res))

    return true
  }

  const checkField = (e) => {
    e.preventDefault()
    !reg.test(input.value) ?
      wrong() :
      send() ? 
        done() :
        fail()

  }
  


  
  button.addEventListener('click', checkField)
  form.addEventListener('submit', checkField)
}