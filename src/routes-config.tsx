import { Permission } from "@/types/permissions";
import { RouteConfig } from "@/types/routes";

import LoginPage from "@/pages/LoginPage";
import ViewPostTab from "@/pages/ViewPostTab";
import ErrorPage from "@/pages/ErrorPage";

export const routesConfig: RouteConfig[] = [
  {
    name: "login",
    path: "/login",
    renderer: {
      element: <LoginPage />,
    },
    translations: ["login"],
  },
  {
    name: "app",
    path: "/",
    renderer: {
      lazy: () => import("@/components/layout/AppLayout"),
    },
    children: [
      {
        name: "home",
        path: "",
        index: true,
        renderer: {
          lazy: () => import("@/pages/HomePage"),
        },
        permissions: [Permission.VIEW_POSTS, Permission.VIEW_COMMENTS],
        translations: ["dashboard", "common"],
      },
      {
        name: "posts",
        path: "posts",
        renderer: {
          lazy: () => import("@/pages/PostsPage"),
        },
        permissions: [Permission.VIEW_POSTS],
        translations: ["posts", "common"],
      },
      {
        name: "createPost",
        path: "posts/create",
        renderer: {
          lazy: () => import("@/pages/CreatePostPage"),
        },
        permissions: [Permission.CREATE_POST],
        translations: ["postCreate", "common"],
      },
      {
        name: "post",
        path: "posts/:id",
        renderer: {
          lazy: () => import("@/pages/PostPage"),
        },
        permissions: [Permission.VIEW_POSTS],
        translations: ["post", "common"],
        children: [
          {
            name: "post.view",
            path: "",
            index: true,
            renderer: {
              element: <ViewPostTab />,
            },
          },
          {
            name: "post.edit",
            path: "edit",
            renderer: {
              lazy: () => import("@/pages/EditPostTab"),
            },
            permissions: [Permission.EDIT_POST],
            translations: ["postEdit"],
          },
          {
            name: "post.comments",
            path: "comments",
            renderer: {
              lazy: () => import("@/pages/PostCommentsTab"),
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
      element: (
        <ErrorPage
          code="403"
          title="Forbidden"
          message="You are not allowed to access this page."
        />
      ),
    },
  },
  {
    name: "notFound",
    path: "*",
    renderer: {
      element: (
        <ErrorPage
          code="404"
          title="Not Found"
          message="The page you are looking for does not exist."
        />
      ),
    },
  },
];
