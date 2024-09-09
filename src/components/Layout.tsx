"use client";

import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow p-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
