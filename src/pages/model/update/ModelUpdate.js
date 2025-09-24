import React from "react";
import Header from "../../../components/Header/Header";
import SubMenu from "../../../components/SubMenu/SubMenu";
import InputModelUpdate from "../../../components/Input/InputModelUpdate/InputModelUpdate";

const ModelUpdate = () => (
  <div className="page-root">
    <Header />
    <div id="container">
      <aside className="submenu-area">
        <SubMenu />
      </aside>

      <main className="campo">
        <h2>Update Modelo</h2>
        <InputModelUpdate />
      </main>
    </div>
  </div>
);

export default ModelUpdate;
