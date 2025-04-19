import React from "react";
import { Outlet, useParams, NavLink } from "react-router-dom";
import { useGetPost } from "../api/posts";
import nav from "../navigation";
import { useAuth } from "../hooks/useAuth";
import { LoadingSpinner } from "../components/ui";
import { ErrorMessage } from "../components/ui";
import { Permission } from "../types/permissions";
import { PageTitle } from "../components/ui";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;

  const { data: post, isLoading, error } = useGetPost(postId);
  const { hasPermission } = useAuth();

  const canEdit = hasPermission([Permission.EDIT_POST]);
  const canViewComments = hasPermission([Permission.VIEW_COMMENTS]);

  if (isLoading)
    return (
      <LoadingSpinner
        text="Loading post..."
        className="flex justify-center items-center min-h-screen"
      />
    );
  if (error) return <ErrorMessage error={error} context="loading post" className="m-4" />;
  if (!post)
    return (
      <div className="text-center p-4 text-gray-400">Post not found (ID: {postId}).</div>
    );

  const getNavLinkClass = ({ isActive }: { isActive: boolean }): string =>
    `inline-block px-4 py-3 rounded-t-lg font-medium text-sm transition duration-150 ease-in-out ${
      isActive
        ? "text-blue-400 bg-gray-800/90 border-b-2 border-blue-500"
        : "text-gray-400 hover:text-gray-300 hover:bg-gray-800/50 border-b-2 border-transparent"
    }`;

  return (
    <div>
      <PageTitle className="text-white">Post: {post.title}</PageTitle>
      <p className="text-sm text-gray-400 -mt-4 mb-6">
        Post ID: {post.id} | User ID: {post.userId}
      </p>

      <div className="mb-6 border-b border-gray-700/50">
        <ul className="flex flex-wrap -mb-px text-center">
          <li className="mr-1">
            <NavLink
              to={nav.post.view.get({ id: post.id })}
              end
              className={getNavLinkClass}
            >
              View Details
            </NavLink>
          </li>
          {canEdit && (
            <li className="mr-1">
              <NavLink
                to={nav.post.edit.get({ id: post.id })}
                className={getNavLinkClass}
              >
                Edit Post
              </NavLink>
            </li>
          )}
          {canViewComments && (
            <li className="mr-1">
              <NavLink
                to={nav.post.comments.get({ id: post.id })}
                className={getNavLinkClass}
              >
                Comments
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <div className="bg-gray-800/80 shadow-lg backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50">
        <Outlet />
      </div>
    </div>
  );
};

export default PostPage;
