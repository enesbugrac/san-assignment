import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetPosts, useDeletePost, Post } from "../api/posts";
import nav from "../navigation";
import { LoadingSpinner } from "../components/ui";
import { ErrorMessage } from "../components/ui";
import { FormButton } from "../components/forms";
import { PageTitle } from "../components/ui";
import { ConfirmationModal } from "../components/ui";

const PostsPage: React.FC = () => {
  const { data: posts, isLoading, error } = useGetPosts();
  const { mutate: deletePostMutate, isPending: isDeleting } = useDeletePost();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState<number | null>(null);

  const openDeleteModal = (id: number) => {
    setPostIdToDelete(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setPostIdToDelete(null);
    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (postIdToDelete !== null) {
      deletePostMutate(postIdToDelete, {
        onSuccess: () => {
          closeDeleteModal();
        },
        onError: (err) => {
          console.error("Deletion failed:", err);
          alert("Failed to delete post. See console for details.");
          closeDeleteModal();
        },
      });
    }
  };

  const handleCreateClick = () => {
    navigate(nav.createPost.get());
  };

  if (isLoading) return <LoadingSpinner text="Loading posts..." className="mt-10" />;
  if (error)
    return <ErrorMessage error={error} context="loading posts" className="m-4" />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <PageTitle className="text-white mb-0">Posts</PageTitle>
        <FormButton variant="primary" onClick={handleCreateClick}>
          Create New Post
        </FormButton>
      </div>

      <div className="bg-gray-800/80 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50">
        <ul className="divide-y divide-gray-700/30">
          {posts && posts.length > 0 ? (
            posts.map((post: Post) => (
              <li
                key={post.id}
                className="p-5 md:p-6 flex flex-col md:flex-row justify-between md:items-center hover:bg-gray-700/30 transition duration-150 ease-in-out"
              >
                <div className="flex-grow mb-3 md:mb-0 md:mr-4">
                  <Link
                    to={nav.post.view.get({ id: post.id })}
                    className="text-lg md:text-xl font-semibold text-blue-400 hover:text-blue-300 transition-colors block mb-1"
                  >
                    {post.title}
                  </Link>
                  <p className="text-sm text-gray-400 line-clamp-2" title={post.body}>
                    {post.body}
                  </p>
                </div>
                <div className="flex space-x-2 flex-shrink-0 self-end md:self-center">
                  <Link to={nav.post.edit.get({ id: post.id })}>
                    <FormButton
                      variant="primary"
                      size="sm"
                      className="text-xs font-medium px-3 py-1.5 bg-gray-800/80 border border-red-600/30 hover:bg-gray-700/50 hover:border-red-500/50"
                      onClick={() => openDeleteModal(post.id)}
                      disabled={isDeleting}
                    >
                      Edit
                    </FormButton>
                  </Link>
                  <FormButton
                    variant="danger"
                    size="sm"
                    className="text-xs font-medium px-3 py-1.5 bg-gray-800/80 border border-red-600/30 !hover:bg-gray-700/50 !hover:border-red-500/50"
                    onClick={() => openDeleteModal(post.id)}
                    disabled={isDeleting}
                  >
                    Delete
                  </FormButton>
                </div>
              </li>
            ))
          ) : (
            <li className="p-6 text-center text-gray-400">No posts found.</li>
          )}
        </ul>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Post"
        message={`Are you sure you want to delete this post? (ID: ${postIdToDelete}) This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isConfirming={isDeleting}
      />
    </div>
  );
};

export default PostsPage;
