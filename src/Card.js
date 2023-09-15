import React from "react";
import "./Card.css"

function Card({card}) {
    /* retreive card object and dsetructure to name and image */
    let cardImg = card['image'];
    let cardName = card['name'];

/* return div with card img otherwise back of card */
return <div className="Card">
    <img alt={cardName} src={cardImg ? cardImg : 'https://deckofcardsapi.com/static/img/back.png'}></img>
</div>
}

export default Card