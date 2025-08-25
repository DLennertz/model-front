import React, { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import SubMenu from "../../../components/SubMenu/SubMenu";
import Pagination from "../../../components/Pagination/Pagination";
import ModelCard from "../../../components/Cards/ModelCard/ModelCard";
import ModeloService from "../../../services/ModelService";
import "./Model.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";

const Model = () => {
  const [data, setModelos] = useState([]);

  const [orderBy, setOrderBy] = useState(
    new URLSearchParams(window.location.search).get("orderBy") == null
      ? "Rating"
      : new URLSearchParams(window.location.search).get("orderBy")
  );
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [page] = useState(parseInt(useParams().page, 10));
  const [qtdRegistros] = useState(8);
  const navigate = useNavigate();
  var key = 0;

  function returnKey() {
    key = key + 1;
    return key;
  }
  useEffect(() => {
    let qtdRegistros = 8;

    ModeloService.getModelo(page - 1, qtdRegistros, orderBy).then((data) =>
      setModelos(data)
    );
    ModeloService.getTotal().then((data) => setTotalRegistros(data));
    navigate(`/Model/${page}?orderBy=${orderBy}`);
  }, [page, orderBy, navigate]);

  const paginate = (pageNumber) => {
    navigate(`/Model/${pageNumber}?orderBy=${orderBy}`);
    window.location.reload();
  };
  const nextPage = () => {
    if (page === Math.ceil(totalRegistros / qtdRegistros)) {
    } else {
      navigate(`/Model/${page + 1}?orderBy=${orderBy}`);
      window.location.reload();
    }
  };
  const prevPage = () => {
    if (page === 1) {
    } else {
      navigate(`/Model/${page - 1}?orderBy=${orderBy}`);
      window.location.reload();
    }
  };

  return (
    <>
      <Header />
      <div id="container">
        <div className="campo">
          <SubMenu />
          <select
            id="orderBy"
            onChange={(event) => {
              if (event.target.value !== "Nada") {
                setOrderBy(event.target.value);
              } else {
              }
            }}
          >
            <option value={"Nada"}>------</option>
            <option value={"Rating"}>Rating</option>
            <option value={"MostRecent"}>Most Recent</option>
            <option value={"LeastRecent"}>Least Recent</option>
          </select>
          <Pagination
            qtdRegistros={qtdRegistros}
            totalRegistros={totalRegistros}
            page={page}
            paginate={paginate}
            nextPage={nextPage}
            prevPage={prevPage}
          />
          <div className="wrapper">
            {data.map((item) => (
              <ModelCard className="CardModel" key={returnKey()} props={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
