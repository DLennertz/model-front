import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/home/Home"));
const Model = lazy(() => import("./pages/model/main/Model"));
const ModelCreate = lazy(() => import("./pages/model/create/ModelCreate"));
const ModelFind = lazy(() => import("./pages/model/find/ModelFind"));
const ModelList = lazy(() => import("./pages/model/find/ModelList"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/model/:page", element: <Model /> },
  { path: "/model/cadastro", element: <ModelCreate /> },
  { path: "/model/find", element: <ModelFind /> },
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
