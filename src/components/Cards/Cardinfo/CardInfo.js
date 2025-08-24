import "./CardInfo.css";

const CardInfo = ({ nome, dataNascimento }) => {
  return (
    <div className="cardInfo">
      <h3>{nome}</h3>
      <p>{dataNascimento}</p>
    </div>
  );
};

export default CardInfo;
