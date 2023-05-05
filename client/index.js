'use strict'

const socket = new WebSocket('ws://localhost:8080')
const form = document.querySelector('#formWs')
const messages = document.querySelector('#messages')

form.addEventListener('submit', onFormSubmit)

function onFormSubmit (e) {
  e.preventDefault()

  const author = form.author.value
  const message = form.message.value 

  socket.send(JSON.stringify({ name: author, message: message })) 
  form.message.value = ''
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const html = `<li><span>${data.name}</span>: <span>${data.message}</span></li>`

    messages.insertAdjacentHTML('beforeend', html)
}

socket.onopen = () => {
  console.log('Connection was established')
}

socket.onclose = () => {
  console.log('Connection was stopped')
}

socket.onerror = (error) => {
  console.log('Connection was interrupted: ', error.message)
}