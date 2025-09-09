import "./App.css";
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/home/Home"));
const Model = lazy(() => import("./pages/model/main/Model"));
const ModelCreate = lazy(() => import("./pages/model/create/ModelCreate"));

const routes = [
  { path: "/", element: <Home /> },
  { path: "/model/:page", element: <Model /> },
  { path: "/model/cadastro", element: <ModelCreate /> },
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
