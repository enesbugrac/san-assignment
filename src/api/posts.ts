import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./client";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export type NewPostBody = Omit<Post, "id">;
export type UpdatePostBody = Partial<NewPostBody>;

const postsQueryKeys = {
  all: ["posts"] as const,
  lists: () => [...postsQueryKeys.all, "list"] as const,
  list: (filters?: { limit?: number }) =>
    [...postsQueryKeys.lists(), filters ?? {}] as const,
  details: () => [...postsQueryKeys.all, "detail"] as const,
  detail: (id: number | undefined) => [...postsQueryKeys.details(), id] as const,
};

export const fetchPosts = (limit?: number): Promise<Post[]> => {
  const endpoint = limit ? `/posts?_limit=${limit}` : "/posts";
  return apiClient<Post[]>(endpoint);
};

export const fetchPost = (id: number): Promise<Post> => {
  if (!id) return Promise.reject(new Error("Post ID is required."));
  return apiClient<Post>(`/posts/${id}`);
};

export const createPost = (newPost: NewPostBody): Promise<Post> => {
  return apiClient<Post>("/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
  });
};

export const updatePost = ({
  id,
  postData,
}: {
  id: number;
  postData: UpdatePostBody;
}): Promise<Post> => {
  if (!id) return Promise.reject(new Error("Post ID is required for update."));
  return apiClient<Post>(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(postData),
  });
};

export const deletePost = (id: number): Promise<void> => {
  if (!id) return Promise.reject(new Error("Post ID is required for deletion."));
  return apiClient<void>(`/posts/${id}`, {
    method: "DELETE",
  });
};

export const useGetPosts = (options?: { limit?: number }) => {
  const { limit } = options || {};
  return useQuery({
    queryKey: postsQueryKeys.list({ limit }),
    queryFn: () => fetchPosts(limit),
  });
};

export const useGetPost = (id: number | undefined) => {
  return useQuery({
    queryKey: postsQueryKeys.detail(id),
    queryFn: () => fetchPost(id!),
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() });
    },
    onError: (error) => {
      console.error("Failed to create post:", error);
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.detail(variables.id) });
    },
    onError: (error) => {
      console.error("Failed to update post:", error);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() });
      queryClient.removeQueries({ queryKey: postsQueryKeys.detail(variables) });
    },
    onError: (error, variables) => {
      console.error(`Failed to delete post with id ${variables}:`, error);
    },
  });
};
