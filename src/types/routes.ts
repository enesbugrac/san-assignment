import React from "react";
import { Permission } from "@/types/permissions";

export interface RouteConfig {
  name: string;
  path: string;
  renderer: {
    element?: React.ReactElement;
    lazy?: () => Promise<{ default: React.ComponentType<JSX.Element> }>;
  };
  permissions?: Permission[];
  translations?: string[];
  children?: RouteConfig[];
  caseSensitive?: boolean;
  index?: boolean;
}
