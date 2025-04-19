import React from "react";
import { useParams } from "react-router-dom";
import { useGetPost } from "@/api/posts";
import { LoadingSpinner } from "@/components/ui";
import { ErrorMessage } from "@/components/ui";

const ViewPostTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;

  const { data: post, isLoading, error } = useGetPost(postId);

  if (isLoading) return <LoadingSpinner text="Loading post details..." />;
  if (error) return <ErrorMessage error={error} context="loading post details" />;
  if (!post) return <p className="text-gray-400">Post data not available.</p>;

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-blue-400">Post Details</h3>
      <p className="text-gray-300 whitespace-pre-wrap">{post.body}</p>
    </div>
  );
};

export default ViewPostTab;
