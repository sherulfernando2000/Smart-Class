import React from "react";
import Header from "./TeacherHeader/TeacherHeader";
import Sidebar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";

const TeacherIndexClass = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header - Full Width */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Header />
      </header>

      {/* Main Content (Sidebar + Outlet) - Positioned below Header */}
      <div className="flex flex-1 mt-[64px]">
        {/* Sidebar - Stays on the left */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-auto">
        <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherIndexClass;
