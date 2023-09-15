
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Card from "./Card"
import './Deck.css'

function Deck() {
    const API_URL = "https://deckofcardsapi.com/api/deck/"
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState('https://deckofcardsapi.com/static/img/back.png');
    const [cardValue, setCardValue] = useState(null)
    const [remaining, setRemaining] = useState(true)
    // let destructuredCard = {}


    /* On page load deck */
  useEffect(() => {
    async function getDeckData() {
      let deck = await axios.get(`${API_URL}/new/shuffle`);
      setDeck(deck.data);
    }
    getDeckData();
  }, []);
  //  end load deck



/* drawCard async function with axios request */
const drawCard = async () => {

  let resp = await axios.get(`${API_URL}/${deck['deck_id']}/draw?count=1`);
  console.log("resp", resp)
   
  /* if resp is truth then...*/
  if (resp) {

    if(resp.data['remaining'] === 0) {
      setRemaining(false);
      alert("No more cards.")
    }
  /*destructuring resp object -  note that I did this because I was having issues with access the values if I just setCard with resp */
  let destructuredCard = {
    image: resp.data['cards'][0]['image'],
    name: `${resp.data['cards'][0]['value']} OF ${resp.data['cards'][0]['suit']}`
  }
  /* set card object */
  setCard(destructuredCard)
}

}


  return (
        <div className="Deck">
            <div className="Deck-btn-cont">
              <button className="Deck-btn" onClick={drawCard} hidden={!remaining}>Draw a Card</button>
            </div>
            <div className="Deck-card-cont">
              <Card card={card}/>
            </div>
        </div>
    )

}

export default Deck



// **********************************************************************
// console.log("card", card)

// useEffect(() => {
// if (card !== 'https://deckofcardsapi.com/static/img/back.png') {

//   let destructuredCard = {
//     image: card['cards'][0]['image'],
//     name: `${card['cards'][0]['value']} OF ${card['cards'][0]['suit']}`
//   }
//   console.log("destructuredCard", destructuredCard)
//   // setCard(destructuredCard)
//   console.log("card:", card)
//   setCardValue(destructuredCard)
//   console.log("cardValue", cardValue)
// }
// }, [cardValue]);

// console.log("!!!destructuredCard", destructuredCard)
// if(destructuredCard) {
//   setCard(destructuredCard)
// }



// console.log("card", card)
// console.log("deckcard['cards']", card['cards'])
// console.log("deckcard['cards']", card['cards']['image'])
// console.log("deckcard['cards']", card['cards'][0])
// console.log("deckcard['cards'][0]['image']", card['cards'][0]['image'])
// console.log("!!!!!!!!!!deck", deck)
// console.log("Deck typeOf", typeof(card))


// * and this works

// async function handleClick() {
//     let card = await axios.get(`${API_URL}/${deck}/draw?count=1`);
//         setCard(card.data['cards'][0].image);
// }

// ! This doesnt work

// function drawCard() {
//     // useEffect(() => {
//     async function getCardData() {
//         let card = await axios.get(`${API_URL}/${deck}/draw?count=1`);
//         setCard(card.data['cards'][0].image);
//     }    
//     getCardData();
//     console.log("card", card)
// }
// }, [num])

//  else {
  
//   let destructuredCard = {
//     image: 'https://deckofcardsapi.com/static/img/back.png',
//     name: 'back of card'
//   }
//   setCard(destructuredCard)
// }
    // const copiedDeck = Object.assign({}, deck);
    // console.log(copiedDeck)
  // console.log("card", card)

// ? I DONT UNDERSTAND WHY PASSING THE VALUE OF THE CARD INTO THE STATE WAS MAKING THE VALUES NOT ABLE TO BE GOTTEN NORMALL USING card['cards'][0] etc...

    // THIS IS A GOOD QUESTION FOR MENTOR WHY AM I UNABLE TO DO THIS WHERE 
    // I HAVE CARD AND BUTTON RENDERING IN THE CARD.JS FILE AND THEN I AM PASSING DOWN THE FUNCTIOND DRAW CARD? THIS DOESNT APPEAR TO WORK AND IT HAS TO DO WITH THE USEEFFECT CANT PUT IT ON THE OUTSIDE AS IT SEEMS THERE IS NO WAY TO PASS IT DOWN THEN. 

    //   function drawCard() {
//         useEffect(() => {
//         console.log("!!!deck", deck)
//         // console.log("deck[deck_id]", deck[deck_id])
//         async function getCardData() {
//           let card = await axios.get(`${API_URL}/${deck}/draw?count=1`);
//           setCard(card.data['cards'][0].image);
//         }
//         getCardData();
//       console.log("card", card)
//     }), [deck]
//   }

// import React from "react";
// import "./Card.css"

// function Card({drawCard}) {

//     const handleClick = evt => {

//         drawCard();
//       };


// return <div className="Card-Container">
//     <button className="Card-btn" onClick={handleClick}>Draw a Card</button>
//     <div className="Card">Card</div>
// </div>
// }

// export default Card