import "./Home.css";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import AniversariantesCarousel from "../../components/AniversariantesCarousel/AniversariantesCarousel";
import ModelService from "../../services/ModelService";

const Home = () => {
  const [aniversariantes, setAniversariantes] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // não usar "new" porque é um objeto
    ModelService.getAniversariante()
      .then((data) => setAniversariantes(data))
      .catch((err) => {
        console.error("Erro ao buscar aniversariantes:", err);
        setErro(
          "Não foi possível carregar os dados. A API pode estar offline."
        );
      });
  }, []);

  return (
    <div>
      <Header />
      {erro ? (
        <p style={{ color: "red", textAlign: "center" }}>{erro}</p>
      ) : (
        <div className="infoRow">
          <AniversariantesCarousel aniversariantes={aniversariantes} />
        </div>
      )}
    </div>
  );
};

export default Home;
