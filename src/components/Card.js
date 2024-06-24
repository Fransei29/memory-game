import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div className="card" onClick={() => onClick(card)}>
      <img src={card.matched || card.flipped ? card.image : '/img/maderita.jpg'} alt="card" />
    </div>
  );
};

export default Card;
