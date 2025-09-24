import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SubMenu.css";

const SubMenu = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <Link
        className={isActive("/model/list") ? "active" : ""}
        to="/model/list"
      >
        <span className={isActive("/model/list") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Listar
        </span>
      </Link>

      <Link
        className={isActive("/model/find") ? "active" : ""}
        to="/model/find"
      >
        <span className={isActive("/model/find") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Achar
        </span>
      </Link>

      <Link
        className={isActive("/model/cadastro") ? "active" : ""}
        to="/model/cadastro"
      >
        <span className={isActive("/modelo/cadastro") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Cadastrar
        </span>
      </Link>

      <Link
        className={isActive("/model/update") ? "active" : ""}
        to="/model/update"
      >
        <span className={isActive("/model/update") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Atualizar
        </span>
      </Link>

      <Link
        className={isActive("/modelo/deletar") ? "active" : ""}
        to="/modelo/deletar"
      >
        <span className={isActive("/modelo/deletar") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Deletar
        </span>
      </Link>
    </div>
  );
};

export default SubMenu;
