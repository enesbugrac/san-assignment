import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
