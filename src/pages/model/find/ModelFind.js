import SubMenu from "../../../components/SubMenu/SubMenu";
import Header from "../../../components/Header/Header";
import InputEncontrarModelo from "../../../components/Input/InputModelFind/InputModelFind";
import "./ModelFind.css";

const ModelFind = () => (
  <div className="page-root">
    <Header />
    <div id="container">
      <aside className="submenu-area">
        <SubMenu />
      </aside>

      <main className="campo">
        <h2>Pesquisar Modelo por ID</h2>
        <InputEncontrarModelo />
      </main>
    </div>
  </div>
);

export default ModelFind;
