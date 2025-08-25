import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./SubMenu.css";

const SubMenu = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <Link
        className={isActive("/modelo/listar") ? "active" : ""}
        to="/modelo/listar"
      >
        <span className={isActive("/modelo/listar") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Listar
        </span>
      </Link>

      <Link
        className={isActive("/modelo/buscar") ? "active" : ""}
        to="/modelo/buscar"
      >
        <span className={isActive("/modelo/buscar") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Achar
        </span>
      </Link>

      <Link
        className={isActive("/modelo/cadastro") ? "active" : ""}
        to="/modelo/cadastro"
      >
        <span className={isActive("/modelo/cadastro") ? "text-active" : ""}>
          <i className="fas fa-arrow-right"></i>Cadastrar
        </span>
      </Link>

      <Link
        className={isActive("/modelo/alterar") ? "active" : ""}
        to="/modelo/alterar"
      >
        <span className={isActive("/modelo/alterar") ? "text-active" : ""}>
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
