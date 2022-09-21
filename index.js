let productsElement = document.querySelector('.products')
let cartElement = document.querySelector('.cart')
let paymentElement = document.querySelector('.payment')
let addBtnElement = document.querySelector('.addBtn')

const cards = document.querySelector('.cards')

let options = [
  productsElement,
  cartElement,
  paymentElement
]

let gamesApi
let addedGames = []


let url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15'
fetch(url).then(response => response.json()).then(responseJson => {
  gamesApi = responseJson
  console.log(gamesApi)
})


options.innerHTML = 'Products'

options.forEach(option => option.addEventListener('click', () => {
  if (option.innerHTML == 'Products') {
    runProducts()
    history.pushState(null, null);
  }
  if (option.innerHTML == 'Cart') {
    runCart()
    // history.pushState(null, null, "/Cart");
  }
  if (option.innerHTML == 'Payment') {
    runPayment()
    // history.pushState(null, null, "/Payment");
  }
}))


function runProducts() {
  cards.innerHTML = ''
  gamesApi.forEach((game) => {
    let card = document.createElement('div')
    card.innerHTML = `
        <div class="card__content">
                <h4>Game Name: ${game.title}</h4>
              </div>
              <div class="card__info">
                <div>
                  <p>Price: ${game.normalPrice}</p>
                </div>
              </div>`

    let addBtn = document.createElement('button')
    addBtn.innerText = 'Add'
    card.appendChild(addBtn)

    addBtn.addEventListener('click', () => {
      let index = gamesApi.indexOf(game)

      if (!addedGames[index]) {
        addedGames.push({
          quantity: 1,
          title: gamesApi[index].title,
          price: gamesApi[index].normalPrice
        })
      }

    })
    cards.appendChild(card)

  })
}

function runCart() {
  cards.innerHTML = ''



  let total = document.createElement('div')

  for (let game of addedGames) {
    total.innerHTML = `<h3>Total Cost: ${game.quantity*game.price*addedGames.length}`
  }




  addedGames.forEach((game) => {





    let card = document.createElement('div')
    card.innerHTML = `
          <div class="card__content">
                  <h4>Game Name: ${game.title}</h4>
                </div>
                <div class="card__info">
                  <div>
                    <p>Price: ${game.price*game.quantity}</p>
                  </div>
                  <div>
                    <p>Quantity: ${game.quantity}</p>
                  </div>
                  
                </div>`

    let addBtn = document.createElement('button')
    addBtn.innerText = '+'
    card.appendChild(addBtn)

    let removeBtn = document.createElement('button')
    removeBtn.innerText = '-'
    card.appendChild(removeBtn)


    let deleteBtn = document.createElement('button')
    deleteBtn.innerText = 'Remove'
    card.appendChild(deleteBtn)


    addBtn.addEventListener('click', () => {
      let index = addedGames.indexOf(game)
      addedGames[index].quantity++
      runCart()

    })

    removeBtn.addEventListener('click', () => {
      if (game.quantity > 1) {
        let index = addedGames.indexOf(game)
        addedGames[index].quantity--
        runCart()
      }
    })

    deleteBtn.addEventListener('click', () => {
      let index = addedGames.indexOf(game)
      addedGames.splice(index, 1)
      runCart()
    })
    cards.appendChild(total)
    cards.appendChild(card)


  })
}

function runPayment() {
  cards.innerHTML = ''
  cards.innerHTML = 'Payment'
}