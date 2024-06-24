import React, { useState, useEffect } from 'react';
import Card from './Card';

const Board = () => {

  // Para mezclar
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

 
  const [cards, setCards] = useState([]);                  // Estado para las cartas del juego
  const [flippedCards, setFlippedCards] = useState([]);    // Estado para las cartas volteadas
  const [gameWon, setGameWon] = useState(false);           // Estado para verificar si el juego ha sido ganado
  const [showCongratulations, setShowCongratulations] = useState(false); // Estado para mostrar el mensaje de felicitaciones

  // useEffect se ejecuta cuando el componente se monta
  useEffect(() => {
    const images = [
      '/img/espada',
      '/img/futbol',
      '/img/caballo',
      // Añade más rutas de imágenes aquí
    ];

    // Crear pares de cartas
    const cardPairs = images.flatMap((image) => [
      { id: `${image}-1`, image, matched: false, flipped: false },
      { id: `${image}-2`, image, matched: false, flipped: false },
      { id: `${image}-3`, image, matched: false, flipped: false },
      { id: `${image}-4`, image, matched: false, flipped: false },
    ]);

    // Mezclar las cartas
    const shuffledCards = shuffleArray(cardPairs);

    // Establecer las cartas en el estado
    setCards(shuffledCards);
  }, []);

  // Manejar el clic en una carta
  const handleCardClick = (card) => {
    // Verificar si ya hay menos de 2 cartas volteadas y que la carta no esté ya volteada
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
      setFlippedCards([...flippedCards, card]);
    }
  };

  // useEffect se ejecuta cuando flippedCards cambia
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards;
      // Verificar si las dos cartas volteadas son iguales
      if (firstCard.image === secondCard.image) {
        setCards((prevCards) =>
          prevCards.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, matched: true }
              : c
          )
        );
      }
    
      setTimeout(() => setFlippedCards([]), 3000);
    }
  }, [flippedCards]);

  // useEffect para verificar si todas las cartas están emparejadas
  useEffect(() => {
        if (cards.length > 0 && cards.every(card => card.matched)) {
            setGameWon(true); // Establecer el estado de juego ganado a verdadero
            setShowCongratulations(true); // Mostrar el mensaje de felicitaciones
            setTimeout(() => {
                setShowCongratulations(false); // Ocultar el mensaje de felicitaciones después de 3 segundos
            }, 3000);
        }
        }, [cards]);

   return (
        <div className="board">
            {cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
            ))}
            {showCongratulations && <div className="congratulations">¡Parabéns!</div>}
        </div>
        );
};

export default Board;
