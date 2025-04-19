import React from "react";
import { useParams } from "react-router-dom";
import { useGetCommentsByPost, Comment } from "../api/comments";
import { LoadingSpinner } from "../components/ui";
import { ErrorMessage } from "../components/ui";

const PostCommentsTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;

  const { data: comments, isLoading, error } = useGetCommentsByPost(postId);

  if (isLoading) return <LoadingSpinner text="Loading comments..." />;
  if (error) return <ErrorMessage error={error} context="loading comments" />;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-teal-400">Comments</h3>
      {comments && comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment: Comment) => (
            <li
              key={comment.id}
              className="border border-gray-700/50 rounded-lg p-4 bg-gray-800/50 backdrop-blur-sm"
            >
              <p className="font-semibold text-teal-400">{comment.name}</p>
              <p className="text-sm text-blue-400 mb-1">{comment.email}</p>
              <p className="text-gray-300 text-sm">{comment.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No comments found for this post.</p>
      )}
    </div>
  );
};

export default PostCommentsTab;
