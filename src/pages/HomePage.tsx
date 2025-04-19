import React from "react";
import { Link } from "react-router-dom";
import { useGetPosts, Post } from "../api/posts";
import { useGetComments, Comment } from "../api/comments";
import nav from "../navigation";
import { PageTitle } from "../components/ui";

const HomePage: React.FC = () => {
  const {
    data: posts,
    isLoading: isLoadingPosts,
    error: errorPosts,
  } = useGetPosts({ limit: 5 });

  const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
  } = useGetComments({ limit: 5 });

  return (
    <div className="w-full px-4">
      <PageTitle className="text-white mb-8" subtitle="Welcome to your dashboard">
        Dashboard
      </PageTitle>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/80 rounded-xl border border-gray-700/50 flex flex-col h-[600px] shadow-lg backdrop-blur-sm">
          <div className="p-4 bg-gray-900/90 border-b border-gray-700/50 rounded-t-xl">
            <h2 className="text-xl font-bold text-white">Recent Posts</h2>
          </div>

          {isLoadingPosts ? (
            <div className="flex-grow flex justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 relative">
                  <div className="w-12 h-12 rounded-full absolute border-4 border-t-blue-500 border-b-blue-700 border-l-transparent border-r-transparent animate-spin"></div>
                </div>
                <div className="mt-4 text-blue-400 text-sm">Loading posts...</div>
              </div>
            </div>
          ) : errorPosts ? (
            <div className="flex-grow flex justify-center items-center p-6">
              <div className="text-red-300 text-center">
                <div className="text-lg font-bold mb-2">⚠️ Error</div>
                <div className="text-sm">An error occurred while loading posts.</div>
              </div>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {posts && posts.length > 0 ? (
                <div className="p-4 space-y-4">
                  {posts.map((post: Post) => (
                    <div
                      key={post.id}
                      className="bg-gray-800/80 rounded-lg overflow-hidden border border-gray-700/50 hover:border-blue-700/30 transition-colors"
                    >
                      <div className="p-3 bg-gray-850/90 flex justify-between items-center border-b border-gray-700/50">
                        <div className="text-blue-400 text-xs font-medium">POST</div>
                        <div className="text-gray-400 text-xs">ID: {post.id}</div>
                      </div>
                      <div className="p-3">
                        <h3 className="text-white text-base font-medium mb-2 line-clamp-1">
                          {post.title}
                        </h3>
                        <Link
                          to={nav.post.view.get({ id: post.id })}
                          className="text-blue-400 text-sm inline-block mt-2 hover:text-blue-300 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-grow flex justify-center items-center p-6">
                  <div className="text-gray-400 text-center">
                    <div className="text-lg mb-2">No posts found</div>
                    <div className="text-sm text-gray-500">
                      Check back later for new content
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-gray-800/80 rounded-xl border border-gray-700/50 flex flex-col h-[600px] shadow-lg backdrop-blur-sm">
          <div className="p-4 bg-gray-900/90 border-b border-gray-700/50 rounded-t-xl">
            <h2 className="text-xl font-bold text-white">Recent Comments</h2>
          </div>

          {isLoadingComments ? (
            <div className="flex-grow flex justify-center items-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 relative">
                  <div className="w-12 h-12 rounded-full absolute border-4 border-t-teal-500 border-b-teal-700 border-l-transparent border-r-transparent animate-spin"></div>
                </div>
                <div className="mt-4 text-teal-400 text-sm">Loading comments...</div>
              </div>
            </div>
          ) : errorComments ? (
            <div className="flex-grow flex justify-center items-center p-6">
              <div className="text-red-300 text-center">
                <div className="text-lg font-bold mb-2">⚠️ Error</div>
                <div className="text-sm">An error occurred while loading comments.</div>
              </div>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
              {comments && comments.length > 0 ? (
                <div className="p-4 space-y-4">
                  {comments.map((comment: Comment) => (
                    <div
                      key={comment.id}
                      className="bg-gray-800/80 rounded-lg overflow-hidden border border-gray-700/50 hover:border-teal-700/30 transition-colors"
                    >
                      <div className="p-3 bg-gray-850/90 flex justify-between items-center border-b border-gray-700/50">
                        <div className="text-teal-400 text-xs font-medium">
                          {comment.name}
                        </div>
                        <div className="text-gray-400 text-xs">ID: {comment.id}</div>
                      </div>
                      <div className="p-3">
                        <div className="text-gray-300 text-sm mb-2 line-clamp-2">
                          {comment.body.length > 80
                            ? comment.body.substring(0, 80) + "..."
                            : comment.body}
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="text-gray-500 text-xs">
                            Post ID: {comment.postId}
                          </div>
                          <Link
                            to={nav.post.comments.get({ id: comment.postId })}
                            className="text-teal-400 text-sm hover:text-teal-300 transition-colors"
                          >
                            View Post
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-grow flex justify-center items-center p-6">
                  <div className="text-gray-400 text-center">
                    <div className="text-lg mb-2">No comments found</div>
                    <div className="text-sm text-gray-500">
                      Check back later for new content
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
