import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/home/Home"));
const Modelo = lazy(() => import("./pages/modelo/main/Modelo"));
const ModeloCadastroSemFoto = lazy(() =>
  import("./pages/modelo/cadastro/ModeloCadastroSemFoto")
);
const ModeloEncontrar = lazy(() =>
  import("./pages/modelo/encontrar/ModeloEncontrar")
);
const ModeloListar = lazy(() => import("./pages/modelo/listar/ModeloListar"));
const ModeloAtualizarSemFoto = lazy(() =>
  import("./pages/modelo/atualizar/ModeloAtualizarSemFoto")
);
const ModeloDeletar = lazy(() => import("./pages/modelo/delete/ModeloDeletar"));
const ModeloPerfil = lazy(() => import("./pages/modelo/perfil/ModeloPerfil"));
const StatsPage = lazy(() => import("./pages/StatsPage"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/modelo/:page", element: <Modelo /> },
  { path: "/modelo/cadastro", element: <ModeloCadastroSemFoto /> },
  { path: "/modelo/buscar", element: <ModeloEncontrar /> },
  { path: "/modelo/listar", element: <ModeloListar /> },
  { path: "/modelo/alterar", element: <ModeloAtualizarSemFoto /> },
  { path: "/modelo/deletar", element: <ModeloDeletar /> },
  { path: "/perfil/:id", element: <ModeloPerfil /> },
  { path: "/stats", element: <StatsPage /> },
];

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
          {routes.map(({ path, element }, i) => (
            <Route key={i} path={path} element={element} />
          ))}
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
