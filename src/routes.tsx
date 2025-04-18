import React from "react";
import AppLayout from "./components/AppLayout";

export enum Permission {
  VIEW_POSTS = "VIEW_POSTS",
  VIEW_COMMENTS = "VIEW_COMMENTS",
  EDIT_POST = "EDIT_POST",
  CREATE_POST = "CREATE_POST",
}

export interface RouteConfig {
  name: string;
  path: string;
  renderer: {
    element?: React.ReactElement;
    lazy?: () => Promise<{ default: React.ComponentType<any> }>;
  };
  permissions?: Permission[];
  translations?: string[];
  children?: RouteConfig[];
  caseSensitive?: boolean;
  index?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: "login",
    path: "/login",
    renderer: {
      lazy: () => import("./pages/LoginPage"),
    },
    translations: ["login"],
  },
  {
    name: "app",
    path: "/",
    renderer: {
      element: <AppLayout />,
    },
    children: [
      {
        name: "home",
        path: "",
        index: true,
        renderer: {
          lazy: () => import("./pages/HomePage"),
        },
        permissions: [Permission.VIEW_POSTS, Permission.VIEW_COMMENTS],
        translations: ["dashboard", "common"],
      },
      {
        name: "posts",
        path: "posts",
        renderer: {
          lazy: () => import("./pages/PostsPage"),
        },
        permissions: [Permission.VIEW_POSTS],
        translations: ["posts", "common"],
      },
      {
        name: "createPost",
        path: "posts/create",
        renderer: {
          lazy: () => import("./pages/CreatePostPage"),
        },
        permissions: [Permission.CREATE_POST],
        translations: ["postCreate", "common"],
      },
      {
        name: "post",
        path: "posts/:id",
        renderer: {
          lazy: () => import("./pages/PostPage"),
        },
        permissions: [Permission.VIEW_POSTS],
        translations: ["post", "common"],
        children: [
          {
            name: "post.view",
            path: "",
            index: true,
            renderer: {
              lazy: () => import("./pages/ViewPostTab"),
            },
          },
          {
            name: "post.edit",
            path: "edit",
            renderer: {
              lazy: () => import("./pages/EditPostTab"),
            },
            permissions: [Permission.EDIT_POST],
            translations: ["postEdit"],
          },
          {
            name: "post.comments",
            path: "comments",
            renderer: {
              lazy: () => import("./pages/PostCommentsTab"),
            },
            permissions: [Permission.VIEW_COMMENTS],
            translations: ["postComments"],
          },
        ],
      },
    ],
  },
  {
    name: "forbidden",
    path: "/403",
    renderer: {
      element: <div>403 - Access Denied</div>,
    },
  },
  {
    name: "notFound",
    path: "*",
    renderer: {
      element: <div>404 - Page Not Found</div>,
    },
  },
];

export default routes;
