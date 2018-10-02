const shuffleButton = document.querySelector('#shuffle-btn');
const drawButton = document.querySelector('#draw-btn');
const highButton = document.querySelector('#high');
const lowButton = document.querySelector('#low');
const cardContainer = document.querySelector('.card-container');
const h1 = document.querySelector('h1')
const h3 = document.querySelector('h3')
const card1 = document.querySelector('#card1');
const card2 = document.querySelector('#card2');

let deckID;
let deckLink;
let cardVal;
let cardVal2;
let numberCorrect = 0;

shuffleButton.addEventListener('click', e => {
  axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
  .then(res => {
    deckID = res.data.deck_id
    deckURL =`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`
    drawButton.classList.remove('hidden')
    numberCorrect = 0;
  })
})

drawButton.addEventListener('click', e => {
  axios.get(deckURL)
  .then(res => {
    if (res.data.cards[0].value > 1 && res.data.cards[0].value < 11) {
      cardVal = Number(res.data.cards[0].value)
    } else {
      if (res.data.cards[0].value === 'JACK') {
        cardVal = 11;
      } else if (res.data.cards[0].value === 'QUEEN') {
        cardVal = 12;
      } else if (res.data.cards[0].value === 'KING') {
        cardVal = 13;
      } else if (res.data.cards[0].value === 'ACE') {
        cardVal = 14;
      }
    }
    card1.src = res.data.cards[0].image
    card1.classList.remove('hidden')

    highButton.classList.remove('hidden')
    lowButton.classList.remove('hidden')
    card2.classList.add('hidden')
  })
})

lowButton.addEventListener('click', e => {
  higherOrLower('low')
})

highButton.addEventListener('click', e => {
  higherOrLower('high')
})

let higherOrLower = (guess) => {
  axios.get(deckURL)
  .then(res => {
    if (res.data.cards[0].value > 1 && res.data.cards[0].value < 11) {
      cardVal2 = Number(res.data.cards[0].value)
    } else {
      if (res.data.cards[0].value === 'JACK') {
        cardVal2 = 11;
      } else if (res.data.cards[0].value === 'QUEEN') {
        cardVal2 = 12;
      } else if (res.data.cards[0].value === 'KING') {
        cardVal2 = 13;
      } else if (res.data.cards[0].value === 'ACE') {
        cardVal2 = 14;
      }
    }
    card2.src = res.data.cards[0].image
    card2.classList.remove('hidden')

    if(guess === 'high'){
      if(cardVal < cardVal2) {
        numberCorrect++;
        h1.textContent = (`Good job`)
        h3.textContent = `Correct: ${numberCorrect}`;
        h1.style.color = 'green'
      }
      else {
        h1.textContent = ('Incorrect')
        h1.style.color = 'red'
      }
    } else if(guess === 'low'){
      if(cardVal > cardVal2) {
        numberCorrect++;
        h1.textContent = (`Good job`)
        h3.textContent = `Correct: ${numberCorrect}`;
        h1.style.color = 'green'
      }
      else{
        h1.textContent = ('Incorrect')
        h1.style.color = 'red'
      }
    }
    lowButton.classList.add('hidden')
    highButton.classList.add('hidden')
  })
}
