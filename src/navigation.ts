import { generatePath } from "react-router-dom";
import { routesConfig } from "@/routes-config";
import type { RouteConfig } from "@/types/routes";

type PathParams = Record<string, string | number>;

interface NavNodeMethods {
  get: (params?: PathParams) => string;
  go: (params?: PathParams) => void;
}

interface NavNodeData {
  _permissions?: RouteConfig["permissions"];
  _path: string;
}

type NavHelperNode = NavNodeMethods & NavNodeData & { [key: string]: NavHelperNode };

type NavHelper = { [key: string]: NavHelperNode };

function isNavNodeMethods(obj: unknown): obj is NavNodeMethods {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as NavNodeMethods).get === "function" &&
    typeof (obj as NavNodeMethods).go === "function"
  );
}

const ensureNodeExists = (
  navObject: Record<string, unknown>,
  nameParts: string[]
): Record<string, unknown> => {
  let currentLevel = navObject;
  for (const part of nameParts) {
    if (!currentLevel[part]) {
      currentLevel[part] = {};
    }
    currentLevel = currentLevel[part] as Record<string, unknown>;
  }
  return currentLevel;
};

let checkPermissions: (permissions: string[] | undefined) => boolean = () => true;

export const setPermissionChecker = (
  permissionFn: (permissions: string[] | undefined) => boolean
) => {
  checkPermissions = permissionFn;
};

function buildNavHelper(routes: RouteConfig[]): NavHelper {
  const nav: Record<string, unknown> = {};
  const routeMap: Map<string, { route: RouteConfig; fullPath: string }> = new Map();

  function processRoute(route: RouteConfig, basePath: string = "") {
    const fullPath = `${basePath}/${route.path}`.replace(/\/\/+/g, "/");
    const nameParts = route.name.split(".");

    const targetNode = ensureNodeExists(nav, nameParts);
    routeMap.set(route.name, { route, fullPath });

    const nodeMethods: NavNodeMethods = {
      get: (params?: PathParams): string => {
        try {
          return generatePath(fullPath, params);
        } catch (e) {
          console.error(`Error generating path for ${route.name}:`, e);
          return fullPath;
        }
      },
      go: (params?: PathParams): void => {
        if (!isNavNodeMethods(targetNode)) {
          console.error(`Cannot call 'go' on node for route '${route.name}'.`);
          return;
        }

        if (route.permissions && route.permissions.length > 0) {
          const hasPermission = checkPermissions(route.permissions);
          if (!hasPermission) {
            alert("You don't have permission to access this page.");
            return;
          }
        }

        const url = targetNode.get(params);
        window.history.pushState({}, "", url);

        window.dispatchEvent(new Event("popstate"));
      },
    };
    const nodeData: NavNodeData = {
      _permissions: route.permissions,
      _path: fullPath,
    };

    Object.assign(targetNode, nodeMethods, nodeData);

    if (route.children) {
      route.children.forEach((child) => processRoute(child, fullPath));
    }
  }

  routes.forEach((route) => processRoute(route));

  return nav as NavHelper;
}

const nav = buildNavHelper(routesConfig);

export default nav;
