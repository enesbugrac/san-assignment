import React from "react";
import { Routes, Route } from "react-router-dom";
import routesConfig from "./routes.tsx";
import type { RouteConfig } from "./routes.tsx";
import ProtectedRoute from "./components/ProtectedRoute";

const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => {
    const { path, index, caseSensitive, renderer, children, name, permissions } = route;

    let element: React.ReactNode = null;
    if (renderer.lazy) {
      const LazyComponent = React.lazy(renderer.lazy);
      element = <LazyComponent />;
    } else if (renderer.element) {
      element = renderer.element;
    }

    if (permissions && permissions.length > 0) {
      element = <ProtectedRoute permissions={permissions}>{element}</ProtectedRoute>;
    }

    if (index) {
      return <Route key={`${name}-index`} index element={element} />;
    }

    return (
      <Route key={name} path={path} caseSensitive={caseSensitive} element={element}>
        {children && children.length > 0 && renderRoutes(children)}
      </Route>
    );
  });
};

function App() {
  return <Routes>{renderRoutes(routesConfig)}</Routes>;
}

export default App;
