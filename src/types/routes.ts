import React from "react";
import { Permission } from "@/types/permissions";

export interface RouteConfig {
  name: string;
  path: string;
  renderer: {
    element?: React.ReactElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lazy?: () => Promise<{ default: React.ComponentType<any> }>;
    props?: Record<string, unknown>;
  };
  permissions?: Permission[];
  translations?: string[];
  children?: RouteConfig[];
  caseSensitive?: boolean;
  index?: boolean;
}
