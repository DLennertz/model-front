import React from "react";
import Header from "../../../components/Header/Header";
import SubMenu from "../../../components/SubMenu/SubMenu";
import InputModelCreate from "../../../components/Input/InputModelCreate/InputModelCreate";

import "./ModelCreate.css";

const ModelCreate = () => (
  <div className="page-root">
    <Header />
    <div id="container">
      <aside className="submenu-area">
        <SubMenu />
      </aside>

      <main className="campo">
        <h2>Cadastrar Modelo</h2>
        <InputModelCreate />
      </main>
    </div>
  </div>
);

export default ModelCreate;
