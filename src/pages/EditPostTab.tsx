import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPost, useUpdatePost, UpdatePostBody } from "@/api/posts";
import nav from "@/navigation";
import { LoadingSpinner } from "@/components/ui";
import { ErrorMessage } from "@/components/ui";
import { FormLabel } from "@/components/forms";
import { FormInput } from "@/components/forms";
import { FormTextarea } from "@/components/forms";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
const EditPostTab: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { data: post, isLoading: isLoadingPost, error: errorPost } = useGetPost(postId);

  const {
    mutate: updatePostMutate,
    isPending: isUpdating,
    error: errorUpdate,
  } = useUpdatePost();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!postId || !title || !body) return;

    const updatedData: UpdatePostBody = {
      title,
      body,
    };

    updatePostMutate(
      { id: postId, postData: updatedData },
      {
        onSuccess: () => {
          showToast("Post updated successfully", "success");
          navigate(nav.post.view.get({ id: postId }), { replace: true });
        },
        onError: (err) => {
          console.error("Error updating post:", err);
          showToast("Failed to update post. See console for details.", "error");
        },
      }
    );
  };

  if (isLoadingPost) return <LoadingSpinner text="Loading post data for editing..." />;
  if (errorPost) return <ErrorMessage error={errorPost} context="loading post data" />;
  if (!post) return <p className="text-gray-400">Post data not available.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-semibold mb-6 text-blue-400 border-b border-gray-700/50 pb-2">
        Edit Post
      </h3>
      <div className="mb-5">
        <FormLabel htmlFor="title" className="text-gray-300">
          Title
        </FormLabel>
        <FormInput
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={isUpdating}
          className="mt-1 bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <FormLabel htmlFor="body" className="text-gray-300">
          Body
        </FormLabel>
        <FormTextarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="mt-1 h-64 bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={isUpdating}
        />
      </div>
      {errorUpdate && (
        <ErrorMessage error={errorUpdate} context="updating post" className="mb-5" />
      )}
      <div className="mt-8 flex justify-end">
        <Button
          type="submit"
          isLoading={isUpdating}
          loadingText="Saving..."
          variant="success"
          className="bg-teal-600 hover:bg-teal-700"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EditPostTab;
