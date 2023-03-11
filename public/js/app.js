const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('messageOne')
const messageTwo = document.getElementById('messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''

    if(location.trim() < 1) {
        console.log('You must enter a corect location name!')
        messageTwo.textContent = 'You must enter a corect location name!'
        return
    }

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            messageTwo.textContent = data.error
        } else {
            console.log(data)
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})

} ) 