import React from "react";
import { Outlet } from "react-router-dom";

const PostPage: React.FC = () => {
  return (
    <div>
      <h2>Post Page Placeholder (for ID: {})</h2>
      <Outlet />
    </div>
  );
};

export default PostPage;
