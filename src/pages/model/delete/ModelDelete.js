import React from "react";
import SubMenu from "../../../components/SubMenu/SubMenu";
import Header from "../../../components/Header/Header";
import InputModelDelete from "../../../components/Input/InputModelDelete/InputModelDelete";

import "./ModelDelete.css";

const ModelDelete = () => (
  <div className="page-root">
    {/* Header no topo */}
    <Header />

    {/* Container principal */}
    <div id="container">
      {/* Lateral esquerda */}
      <aside className="submenu-area">
        <SubMenu />
      </aside>

      {/* Conteúdo principal */}
      <main className="campo">
        <h2>Deletar Modelo por ID</h2>
        <InputModelDelete />
      </main>
    </div>
  </div>
);

export default ModelDelete;
