let productsElement = document.querySelector('.products')
let cartElement = document.querySelector('.cart')
let paymentElement = document.querySelector('.payment')
let addBtnElement = document.querySelector('.addBtn')

const cardsRoot = document.querySelector('.cards')
const paymentRoot = document.querySelector('.paymentPage')

// const cards = Array.from(document.querySelector('.cards'))

let options = [
  productsElement,
  cartElement,
  paymentElement
]

let routes = {
  '/products': runProducts,
  '/cart': runCart,
  '/payment': runPayment,
}

let gamesApi
let addedGames = []
let totalSum = 0

let url = 'https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15'



options.forEach(option => option.addEventListener('click', () => {
  if (option.innerHTML == 'Products') {
    navigate('/products');
  }
  if (option.innerHTML == 'Cart') {
    navigate('/cart');
  }
  if (option.innerHTML == 'Payment') {

    navigate("/payment");
  }

}))

// window.addEventListener('locationchange', renderRoute)

function renderRoute() {
  switch (window.location.pathname) {
    case '/products':
      routes['/products']()
      break
    case '/cart':
      routes['/cart']()
      break
    case '/payment':
      routes['/payment']()
      break
    default:
      routes['/products']()
  }
}

function navigate(path) {

  if (path[0] === '/')
    window.history.pushState(null, null, path)
  else
    window.history.pushState(null, null, window.location.pathname + '/' + path)
  renderRoute()
}

function runProducts() {
  paymentRoot.innerHTML =''

  cardsRoot.innerHTML = ''

  let sum = totalSum

  gamesApi.forEach((game) => {


    let addBtn = document.createElement('button')
    addBtn.innerText = 'Add To Cart'
    addBtn.setAttribute('class', 'btnClass')

    for (let i = 0; i < addedGames.length; i++) {

      if (addedGames[i].gameId == game.gameID) {
        let index = gamesApi.indexOf(game)

        gamesApi[index].clicked = 'Added'

      }
    }


    let card = document.createElement('div')
    card.innerHTML = `
        <div class="card__content">
                <h4>Game Name: ${game.title}</h4>
              </div>
              <div class="card__info">
                <div>
                  <p>Price: ${parseInt(game.normalPrice)}$</p>
                </div>
                <div>
                  <p>Status: ${game.clicked}</p>
                </div>
                
              </div>`

    card.appendChild(addBtn)

    addBtn.addEventListener('click', () => {

      let index = gamesApi.indexOf(game)

      if (gamesApi[index].clicked == 'Avilable') {
        gamesApi[index].clicked = 'Added'

        addedGames.push({
          gameId: gamesApi[index].gameID,
          quantity: 1,
          title: gamesApi[index].title,
          price: parseInt(gamesApi[index].normalPrice)
        })
        sum += parseInt(gamesApi[index].normalPrice)

        totalSum = sum
      }


      runProducts()
    })

    cardsRoot.appendChild(card)
  })
}




function runCart() {

  paymentRoot.innerHTML =''

  cardsRoot.innerHTML = ''



  let total = document.createElement('div')

  total.setAttribute('class', 'totalDiv')
  let sum = 0;


  let paymentBtn = document.createElement('button')
  paymentBtn.innerText = 'Proceed to Payment'
  paymentBtn.setAttribute('class', 'btnClass')
  paymentBtn.addEventListener('click', () => {
    totalSum = sum
    navigate('/payment')
  })


  for (let game of addedGames) {
    const productPrice = game.quantity * parseInt(game.price)
    sum += productPrice
    totalSum = sum
    total.innerHTML = `<h3>Total Cost: ${sum}$</h3>`
  }

  if (total.innerHTML) {
    total.appendChild(paymentBtn)
  }

  if (!total.innerHTML) {
    totalSum = 0
  }


  cardsRoot.appendChild(total)
  addedGames.forEach((game) => {


    let card = document.createElement('div')
    card.innerHTML = `
          <div class="card__content">
                  <h4>Game Name: ${game.title}</h4>
                </div>
                <div class="card__info">
                  <div>
                    <p>Price: ${game.price*game.quantity}$</p>
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
      for (let i = 0; i < gamesApi.length; i++) {
        if (game.gameId == gamesApi[i].gameID) {
          gamesApi[i].clicked = 'Avilable'
        }
      }

      addedGames.splice(index, 1)
      runCart()
    })

    cardsRoot.appendChild(card)

  })
}



function runPayment() {
  cardsRoot.innerHTML = ''
  paymentRoot.innerHTML = `
  
<div class="container">

<form action="">

    <div class="row">

        <div class="col">

            <h3 class="title">billing address</h3>

            <div class="inputBox">
                <span>full name :</span>
                <input type="text" placeholder="john deo">
            </div>
            <div class="inputBox">
                <span>email :</span>
                <input type="email" placeholder="example@example.com">
            </div>
            <div class="inputBox">
                <span>address :</span>
                <input type="text" placeholder="room - street - locality">
            </div>
            <div class="inputBox">
                <span>city :</span>
                <input type="text" placeholder="ramat-gan">
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>state :</span>
                    <input type="text" placeholder="israel">
                </div>
                <div class="inputBox">
                    <span>zip code :</span>
                    <input type="text" placeholder="123 456">
                </div>
            </div>

        </div>

        <div class="col">

            <h3 class="title">payment</h3>

            <div class="inputBox">
                <span>name on card :</span>
                <input type="text" placeholder="mr. john deo">
            </div>
            <div class="inputBox">
                <span>credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444">
            </div>
            <div class="inputBox">
                <span>exp month :</span>
                <input type="text" placeholder="january">
            </div>

            <div class="flex">
                <div class="inputBox">
                    <span>exp year :</span>
                    <input type="number" placeholder="2022">
                </div>
                <div class="inputBox">
                    <span>CVV :</span>
                    <input type="text" placeholder="1234">
                </div>
            </div>

            <div class="totalCost">
            <span>Total Cost :</span>
            <h3 >${totalSum}$</h3>
        </div>

        </div>

    </div>

    <input type="button" value="proceed to checkout" class="submit-btn">

</form>

</div>    `
}

window.onload = function () {
  fetch(url).then(response => response.json()).then(responseJson => {
    gamesApi = responseJson
    for (let i = 0; i < gamesApi.length; i++) {
      gamesApi[i].clicked = 'Avilable'
    }
    renderRoute()
  })
};

// WindowEventHandlers.onbeforeunload = () => {
//   alert('"are you sure you wanna leave"?');
// window.location = "/";
// window.location = "/index.html";
// }