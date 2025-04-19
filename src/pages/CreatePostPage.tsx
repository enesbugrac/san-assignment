import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost, NewPostBody } from "../api/posts";
import nav from "../navigation";
import { ErrorMessage } from "../components/ui";
import { FormLabel } from "../components/forms";
import { FormInput } from "../components/forms";
import { FormTextarea } from "../components/forms";
import { PageTitle } from "../components/ui";
import Button from "../components/ui/Button";
import { useToast } from "../hooks/useToast";

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { mutate: createPostMutate, isPending, error: createError } = useCreatePost();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title || !body) return;

    const newPost: NewPostBody = {
      title,
      body,
      userId: 1,
    };

    createPostMutate(newPost, {
      onSuccess: (createdPost) => {
        console.log("Successfully created post:", createdPost);
        showToast("Post created successfully", "success");
        navigate(nav.posts.get());
      },
      onError: (err) => {
        console.error("Error on component level:", err);
        showToast("Failed to create post. See console for details.", "error");
      },
    });
  };

  return (
    <div className="max-w-xl mx-auto">
      <PageTitle className="text-white">Create New Post</PageTitle>
      <div className="bg-gray-800/80 shadow-lg backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-700/50">
        <form onSubmit={handleSubmit}>
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
              disabled={isPending}
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
              className="mt-1 h-40 bg-gray-700/70 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              required
              disabled={isPending}
            />
          </div>
          {createError && (
            <ErrorMessage error={createError} context="creating post" className="mb-5" />
          )}
          <div className="mt-8 flex justify-end">
            <Button
              type="submit"
              isLoading={isPending}
              loadingText="Creating..."
              variant="primary"
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
