import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Header from "./components/header/Header";
import List from "./components/list/List";
import { useGlobalContext } from "./contexts/GlobalContext";
import "./App.css";
import removeCardFromList from "./utils/removeCardFromList";
import addCardToList from "./utils/addCardToList";
import getListName from "./utils/getListName";

const App = () => {
  const { lists, setLists, cards, setCards } = useGlobalContext();

  const handleAddList = () => {
    // Get list name
    const listName = getListName({ lists });
    if (listName) {
      const currentList = JSON.parse(JSON.stringify(lists));
      currentList.push(listName);
      setLists(currentList);
    }
  };

  const handleDragEnd = ({ source, destination, draggableId }) => {
    // Snap card back to its place if dragged outside
    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    // Get card being dragged
    const cuurentCard = cards.get(source.droppableId)[source.index];

    // Remove card from current list
    const freshCardsMap = removeCardFromList({
      cards,
      title: source.droppableId,
      currentCardTime: cuurentCard.creationTime,
    });

    // Add card to destination list
    const cardForCurrentList = addCardToList({
      cards: freshCardsMap,
      title: destination.droppableId,
      cardDetails: {
        cardTitle: cuurentCard.title,
        cardDesc: cuurentCard.description,
        cardTime: cuurentCard.creationTime,
      },
    });

    // Sort by creation time
    cardForCurrentList.sort(
      (a, b) => new Date(a.creationTime) - new Date(b.creationTime)
    );
    freshCardsMap.set(destination.droppableId, cardForCurrentList);
    setCards(freshCardsMap);
  };

  return (
    <>
      <Header />

      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <button onClick={handleAddList}>Add List</button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: "flex", gap: "2%" }}>
          {lists.map((listName) => (
            <Droppable droppableId={listName} key={listName}>
              {(provided) => (
                <div
                  className="listCover"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <List title={listName} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
};

export default App;
