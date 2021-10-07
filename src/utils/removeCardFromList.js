export default ({ cards, title, currentCardTime }) => {
  const currentCards = new Map(cards);
  let cardsForCurrentList = currentCards.get(title);
  // Filter on the basis of creation time since it'll always be unique
  const cleanedList = cardsForCurrentList.filter(({ creationTime }) => {
    return creationTime !== currentCardTime;
  });
  currentCards.set(title, cleanedList);
  return currentCards;
};
