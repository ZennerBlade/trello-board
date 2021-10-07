export default ({
  cards,
  title,
  cardDetails: { cardTitle, cardDesc, cardTime },
}) => {
  let cardForCurrentList = cards.get(title);
  // If cards already exist in list
  if (cardForCurrentList?.length) {
    cardForCurrentList.push({
      title: cardTitle,
      description: cardDesc,
      creationTime: cardTime,
    });
  } else {
    // If no cards exist
    cardForCurrentList = [
      {
        title: cardTitle,
        description: cardDesc,
        creationTime: cardTime,
      },
    ];
  }
  return cardForCurrentList;
};
