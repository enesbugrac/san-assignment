import { useQuery } from "@tanstack/react-query";
import { apiClient } from "./client";

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const commentsQueryKeys = {
  all: ["comments"] as const,
  lists: () => [...commentsQueryKeys.all, "list"] as const,
  list: (filters?: { postId?: number; limit?: number }) =>
    [...commentsQueryKeys.lists(), filters ?? {}] as const,
  listByPost: (postId: number | undefined) => commentsQueryKeys.list({ postId }),
};

export const fetchComments = (params?: {
  postId?: number;
  limit?: number;
}): Promise<Comment[]> => {
  let endpoint = "/comments";
  const queryParams = new URLSearchParams();
  if (params?.postId) {
    queryParams.append("postId", String(params.postId));
  }
  if (params?.limit) {
    queryParams.append("_limit", String(params.limit));
  }
  const queryString = queryParams.toString();
  if (queryString) {
    endpoint += `?${queryString}`;
  }
  return apiClient<Comment[]>(endpoint);
};

export const fetchCommentsByPost = (postId: number): Promise<Comment[]> => {
  return fetchComments({ postId });
};

export const useGetComments = (params?: { postId?: number; limit?: number }) => {
  return useQuery({
    queryKey: commentsQueryKeys.list(params),
    queryFn: () => fetchComments(params),
    enabled: params?.postId ? !!params.postId : true,
  });
};

export const useGetCommentsByPost = (postId: number | undefined) => {
  return useGetComments({ postId });
};
