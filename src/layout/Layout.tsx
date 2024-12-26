import { Header, SideBar } from "components";
import { Outlet } from "react-router-dom";
import React from "react";

function Index() {
  return (
    <div className="  flex flex-col min-w-full w-fit font-inter">
      <Header />

      <main className="flex flex-row max-h-[calc(100vh-4rem)] bg-[#F5F7FA] grow">
        {/* Sidebar with flex-grow and full height */}
        <div className="flex-shrink-0 h-[calc(100vh-4rem)]">
          <SideBar />
        </div>

        {/* Outlet for content, filling remaining space */}
        <div className="flex-grow max-h-[calc(100vh-4rem)] overflow-y-auto h-[calc(100vh-4rem)] w-fit">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Index;
