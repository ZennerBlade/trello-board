import "./CardListHeader.css";

const CardListHeader = ({ handleCross, title }) => {
  return (
    <div className="cardListContainer">
      <div className="cardListTitle">
        <div style={{ wordBreak: "break-word" }}>{title}</div>
        <div style={{ cursor: "pointer" }} onClick={handleCross}>
          X
        </div>
      </div>
      <hr style={{ width: "99%" }} />
    </div>
  );
};

export default CardListHeader;
