import React, { useRef, useState, useEffect } from "react";
import CardInfo from "../Cards/Cardinfo/CardInfo";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./AniversariantesCarousel.css";

const AniversariantesCarousel = ({ aniversariantes }) => {
  const scrollRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      setShowButtons(
        scrollRef.current.scrollWidth > scrollRef.current.clientWidth
      );
    }
  }, [aniversariantes]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!aniversariantes || aniversariantes.length === 0) {
    return <div className="no-data">Nenhum aniversariante hoje 🎉</div>;
  }

  return (
    <div className="carousel-container">
      {showButtons && (
        <button className="carousel-btn left" onClick={() => scroll("left")}>
          <FaChevronLeft />
        </button>
      )}

      <div
        className={`carousel-content ${!showButtons ? "center-content" : ""}`}
        ref={scrollRef}
      >
        {aniversariantes.map((pessoa) => (
          <CardInfo
            key={pessoa.id}
            nome={pessoa.nomeCompleto}
            dataNascimento={pessoa.dataNascimento}
          />
        ))}
      </div>

      {showButtons && (
        <button className="carousel-btn right" onClick={() => scroll("right")}>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default AniversariantesCarousel;
