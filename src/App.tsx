import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routesConfig } from "@/routes-config";
import type { RouteConfig } from "@/types/routes";
import ProtectedRoute from "@/components/utils/ProtectedRoute";
import TranslationPrefetcher from "@/components/utils/TranslationPrefetcher";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => {
    const {
      path,
      index,
      caseSensitive,
      renderer,
      children,
      name,
      permissions,
      translations,
    } = route;

    let element: React.ReactNode = null;
    if (renderer.lazy) {
      const LazyComponent = React.lazy(renderer.lazy);
      element = (
        <Suspense
          fallback={
            <LoadingSpinner
              text="Loading..."
              className="flex justify-center items-center min-h-screen"
            />
          }
        >
          <LazyComponent />
        </Suspense>
      );
    } else if (renderer.element) {
      element = renderer.element;
    }

    if (translations && translations.length > 0) {
      element = (
        <TranslationPrefetcher translationKeys={translations}>
          {element}
        </TranslationPrefetcher>
      );
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
