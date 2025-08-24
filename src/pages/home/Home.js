import "./Home.css";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import AniversariantesCarousel from "../../components/AniversarientesCarousel/AniversariantesCarousel";
import ModeloService from "../../services/ModeloService";

const Home = () => {
  const [aniversariantes, setAniversariantes] = useState([]);

  useEffect(() => {
    const modeloService = new ModeloService();
    modeloService.getAniversariante().then((data) => setAniversariantes(data));
  }, []);

  return (
    <div>
      <Header />
      <div className="infoRow">
        <AniversariantesCarousel aniversariantes={aniversariantes} />
      </div>
    </div>
  );
};

export default Home;
