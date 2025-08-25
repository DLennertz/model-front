import React from "react";
import "./ModelCard.css";
import { Link } from "react-router-dom";

const ModelCard = (props) => {
  console.log(props);

  return (
    <div className="card">
      <div className="card__body">
        <h2 className="cardNome">{props.props.nomeCompleto}</h2>
        <h3>
          {props.props.id} {props.props.country}
        </h3>

        {props.props.photos.length === 0 ? (
          <img
            src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"
            alt="Template Image"
          />
        ) : (
          <img
            className="cardFoto"
            alt="Foto da modelo"
            src={`${props.props.photos[0].url}`}
          />
        )}

        <div className="cardInfo">
          <div className="cardInfoBox">
            <p>Height {props.props.height}</p>
            <p>Bust {props.props.bust}</p>
            <p>Waist {props.props.waist}</p>
            <p>Hips {props.props.hips}</p>
          </div>
          <div className="cardInfoBox">
            <p>Eyes {props.props.eyeColor}</p>
            <p>Hair {props.props.hairColor}</p>
            <p>Boys {props.props.boys}</p>
            <p>Girls {props.props.girls}</p>
          </div>
        </div>
      </div>
      <button className="card__btn">
        {" "}
        <Link to={`/Perfil/${props.props.id}`}>Mais detalhes</Link>
      </button>
    </div>
  );
};
export default ModelCard;
