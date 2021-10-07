import CardListHeader from "../commonComp/CardListHeader";
import "./Card.css";

const Card = ({ title, description, creationTime, handleCross }) => {
  return (
    <div className="cardContainer">
      <CardListHeader
        handleCross={() => handleCross(creationTime)}
        title={title}
      />
      {description}
    </div>
  );
};

export default Card;
