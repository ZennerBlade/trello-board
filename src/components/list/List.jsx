import { Draggable } from "react-beautiful-dnd";
import { useGlobalContext } from "../../contexts/GlobalContext";
import addCardToList from "../../utils/addCardToList";
import removeCardFromList from "../../utils/removeCardFromList";
import Card from "../card/Card";
import CardListHeader from "../commonComp/CardListHeader";
import "./List.css";

const List = ({ title }) => {
  const { lists, setLists, cards, setCards } = useGlobalContext();

  const handleCross = () => {
    const listCopy = JSON.parse(JSON.stringify(lists));
    // Filter on the basis of listname as listnames have been made unique
    const cleanedList = listCopy.filter((v) => {
      return v !== title;
    });
    // Delete cards for current list
    const cardCopy = new Map(cards);
    cardCopy.delete(title);
    setCards(cardCopy);
    setLists(cleanedList);
  };

  const handleAddCard = () => {
    let cardTitle;
    let cardDesc;
    let cardTime;
    while (true) {
      cardTitle = prompt(
        "Enter Title (only letters, numbers and spaces)",
        "Sample Title"
      );
      cardDesc = prompt("Enter Description", "Sample Description");
      cardTime = new Date();

      // Cancel prompt
      if (!cardTitle && !cardDesc) {
        return;
      }

      const regex = /^[A-Z0-9 ]+$/i;
      if (regex.test(cardTitle) && cardDesc) {
        break;
      }
    }

    const cardsCopy = new Map(cards);
    const cardForCurrentList = addCardToList({
      cards: cardsCopy,
      title,
      cardDetails: {
        cardTitle,
        cardDesc,
        cardTime,
      },
    });
    cardsCopy.set(title, cardForCurrentList);
    setCards(cardsCopy);
  };

  const cardsToRender = () => {
    const cardsForCurrentList = cards.get(title);
    if (cardsForCurrentList) {
      return cardsForCurrentList.map(
        ({ creationTime, title, description }, idx) => (
          <Draggable
            key={creationTime}
            draggableId={creationTime.toString()}
            index={idx}
          >
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <Card
                  key={creationTime}
                  title={title}
                  description={description}
                  creationTime={creationTime}
                  handleCross={handleRemoveCardsFromList}
                />
              </div>
            )}
          </Draggable>
        )
      );
    } else {
      return <></>;
    }
  };

  const handleRemoveCardsFromList = (currentCardTime) => {
    setCards(removeCardFromList({ cards, title, currentCardTime }));
  };

  return (
    <div className="listContainer">
      <CardListHeader handleCross={handleCross} title={title} />
      <div className="listCardContainer">{cardsToRender()}</div>
      <div className="listAddCard" onClick={handleAddCard}>
        +
      </div>
    </div>
  );
};

export default List;
