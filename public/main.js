const ranks = [
  'Ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King'
]

const suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts']
let dealerCards = []
let playerCards = []
let dealerScore = 0
let playerScore = 0
const deck = []

// get values using a if statement
const getCardValue = rank => {
  if (rank === 'Ace') {
    return 11
  } else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}

const main = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      const card = {
        rank: ranks[j],
        suit: suits[i],
        value: getCardValue(ranks[j]),
        imgg : './images/cards/' + ranks[j]+'_of_'+suits[i]+'.svg'
      }
      deck.push(card)
    }
  }
  for (let i = 0; i < deck.length; i++) {
    const j = Math.floor(Math.random() * 52)
    const temp = deck[i]
    deck[i] = deck[j]
    deck[j] = temp
  }

  // dealerCards = [dealACardd(), dealACardd()] // wich one is the right way

  // playerCards = [dealACardp(), dealACardp()]

  dealACardd()
  dealACardd()
  dealACardp()
  dealACardp()

  console.log(deck)
  console.log(dealerCards)
  console.log(playerCards)
}

const dealACardp = () => {
  // document.querySelector('.player-hand').textContent = deck[0]
  const drawnCard = deck.pop()
  playerCards.push(drawnCard)
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
 // img.src = './images/cards/' + drawnCard.rank +'_of_'+drawnCard.suit+'.svg'
  //cardLi.appendChild(img)
  img.src = drawnCard.imgg
 // cardLi.textContent = drawnCard.rank + ' of ' + drawnCard.suit
  // cardLi.src = 'images/cards/2_of_clubs.svg'
  //cardLi.style.listStyleImage = "url('images/cards/2_of_clubs.svg')"
  document.querySelector('.player-hand').appendChild(img)
  document.querySelector('.player-hand').appendChild(cardLi)

  let sum = 0
  for (let i = 0; i < playerCards.length; i++) {
    sum += playerCards[i].value
  }
  if (sum > 21) {
    document.querySelector('.hit').disabled = true
    document.querySelector('.player-text').textContent = 'YOU LOST!!!'
  }
  document.querySelector('.player-sum').textContent = '  Players Score ' + sum
}

const dealACardd = () => {
  // document.querySelector('.player-hand').textContent = deck[0]
  const drawnCard = deck.pop()
  dealerCards.push(drawnCard)
  
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
   img.src = drawnCard.imgg
  cardLi.appendChild(img)
  //cardLi.textContent = drawnCard.rank + ' of ' + drawnCard.suit
  document.querySelector('.dealer-hand').appendChild(img)
  document.querySelector('.dealer-hand').appendChild(cardLi)

  let sum = 0
  for (let i = 0; i < dealerCards.length; i++) {
    sum += dealerCards[i].value
  }
  document.querySelector('.dealer-sum').textContent = 'Dealers score ' + sum
}

const stand = () => {
  document.getElementById('backimg').style.display = 'none'
  document.getElementById('deala').style.display = 'block'
  document.querySelector('.hit').disabled = true
  let dsum = 0
  for (let i = 0; i < dealerCards.length; i++) {
    dsum += dealerCards[i].value
    console.log(dsum)
  }
  
  if (dsum < 17) {
    dealACardd()
  }
  
  checkwinner()
  
}
 

const checkwinner = () => {
  let dsum = 0
  for (let i = 0; i < dealerCards.length; i++) {
    dsum += dealerCards[i].value
  }
  let psum = 0
  for (let j = 0; j < playerCards.length; j++) {
    psum += playerCards[j].value
  }

  if (dsum <= 21 && dsum > psum) {
    document.querySelector('.dealer-text').textContent = 'House wins'
  } else if (dsum > 21 || psum > dsum) {
    document.querySelector('.player-text').textContent = 'Player Wins'
  }
}
const reset = () => {
  location.reload()
}
document.querySelector('.reset').addEventListener('click', reset)
document.querySelector('.stand').addEventListener('click', stand)
document.querySelector('.hit').addEventListener('click', dealACardp)
document.addEventListener('DOMContentLoaded', main)
