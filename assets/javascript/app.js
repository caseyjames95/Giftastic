document.addEventListener('click', event => {
    if (event.target.className === 'car') {
      let car = event.target.dataset.car

      let url = `https://api.giphy.com/v1/gifs/search?q=${car}&api_key=dc6zaTOxFJmzC&limit=10`

      fetch(url)
        .then(r => r.json())
        .then(gifs => {
          console.log(gifs)
          document.getElementById('gifDisp').innerHTML = ''
          gifs.data.forEach(gif => {
            let gifElem = document.createElement('img')
            // currently displayed gif
            gifElem.src = gif.images.original_still.url
            // link to the still version
            gifElem.dataset.still = gif.images.original_still.url
            // link to the animated version
            gifElem.dataset.animated = gif.images.original.url
            // if the gif is animated
            gifElem.dataset.isanimated = false
            // set gif class
            gifElem.className = 'gif'

            document.getElementById('gifDisp').append(gifElem)
          })
        })
    } else if (event.target.className === 'gif') {
      if (event.target.isanimated === 'true') {
        event.target.src = event.target.dataset.still
        event.target.isanimated = 'false'
      } else {
        event.target.src = event.target.dataset.animated
        event.target.isanimated = 'true'
      }
    }
  })

  document.getElementById('addCar').addEventListener('click', event => {
    event.preventDefault()
    let btnElem = document.createElement('button')
    btnElem.textContent = document.getElementById('newCar').value
    btnElem.dataset.car = document.getElementById('newCar').value
    btnElem.className = 'car'
    document.getElementById('buttons').append(btnElem)
    document.getElementById('newCar').value = ''
  })