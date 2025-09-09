import Header from "../../../components/Header/Header";
import SubMenu from "../../../components/SubMenu/SubMenu";
import ModelTable from "../../../components/Table/ModelTable/ModelTable";
import "./ModelList.css";

const ModelList = () => (
  <>
    <Header />
    <div id="container">
      <main className="campo">
        <SubMenu />
        <h2>Modelos Cadastrados</h2>
        <ModelTable />
      </main>
    </div>
  </>
);

export default ModelList;
