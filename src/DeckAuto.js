
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CardAuto from "./CardAuto"
import './DeckAuto.css'

function DeckAuto() {
    const API_URL = "https://deckofcardsapi.com/api/deck/"
    const [deck, setDeck] = useState(null);
    const [card, setCard] = useState('https://deckofcardsapi.com/static/img/back.png');
    const [remaining, setRemaining] = useState(true)
    // note: used this to debug and see what was happening in the interval  const [seconds, setSeconds] = useState(0)
    const [toggleDraw, setToggleDraw] = useState(true)
    const intervalRef = useRef()
     // note: used this to debug and see what was happening in the interval 
    // const secondsRef = useRef(0)

    /* On page load deck */
  useEffect(() => {
    async function getDeckData() {
      let deck = await axios.get(`${API_URL}/new/shuffle`);
      setDeck(deck.data);
    }
    getDeckData();
  }, []);
  //  end load deck


/* handleClick set toggleDraw value to true or false clear interval and set new interval */
function handleClick() {

  let toggleDrawValue = (toggleDraw ? false : true)

  setToggleDraw(toggleDrawValue)

  if(intervalRef.current) {
    clearInterval(intervalRef.current)
  }

  intervalRef.current = setInterval(() => {
    // note: used this to debug and see what was happening in the interval 
    // console.log("seconds:", secondsRef.current);
    if(toggleDraw){
      drawCard();
    }     
     // note: used this to debug and see what was happening in the interval 
    // secondsRef.current += 1;
  
  }, 1000);

}

// end of handleClick

/* drawCard async function with axios request */
 
    const drawCard = async () => {
      let resp = await axios.get(`${API_URL}/${deck['deck_id']}/draw?count=1`);
       
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
  

/* return divs with button and card */
  return (
        <div className="Deck">
            <div className="Deck-btn-cont">
              <button className="Deck-btn" onClick={handleClick} hidden={!remaining}>{toggleDraw ? "Draw" : "Pause Draw"}</button>
            </div>
            <div className="Deck-card-cont">
              <CardAuto card={card}/>
            </div>
        </div>
    )

}

export default DeckAuto