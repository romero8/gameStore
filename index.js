let productsElement = document.querySelector('.products')
let basketElement = document.querySelector('.basket')
let paymentElement = document.querySelector('.payment')
let addBtnElement = document.querySelector('.addBtn')

const cards = document.querySelector('.cards')

let options = [
  productsElement,
  basketElement,
  paymentElement
]

let gamesApi = []
let addedGames = []

let url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15'
fetch(url).then(response => response.json()).then(responseJson => {
  gamesApi.push(responseJson)
})


options.forEach(option => option.addEventListener('click', () => {
  if (option.innerHTML == 'Products') {
    runProducts()
  }
  if (option.innerHTML == 'Basket') {
    runBasket()
  }
  if (option.innerHTML == 'Payment') {
    runPayment()
  }
}))


function runProducts() {
  cards.innerHTML = ''
  gamesApi.forEach((games) => {
    for (let game of games) {
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
        let index = games.indexOf(game)
        addedGames.push({
          title: games[index].title,
          price: games[index].normalPrice
        })
        console.log(addedGames)
      })
      cards.appendChild(card)
    }
  })
}


function runBasket() {
  cards.innerHTML = ''
  addedGames.forEach((games) => {
    let card = document.createElement('div')
    card.innerHTML = `
        <div class="card__content">
                <h4>Game Name: ${games.title}</h4>
              </div>
              <div class="card__info">
                <div>
                  <p>Price: ${games.price}</p>
                </div>
                
              </div>`
    cards.appendChild(card)
  })
}

function runPayment() {
  cards.innerHTML = ''
  cards.innerHTML = 'Payment'
}