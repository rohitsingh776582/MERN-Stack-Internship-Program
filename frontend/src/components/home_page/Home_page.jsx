import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

function Home_page() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen w-full overflow-hidden bg-gray-50">
      
      {/* Top Navbar - Fixed at top */}
      <Navbar
        onBellClick={() => {
          
          navigate("/home-page/assignments");
        }}
      />

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          
        
          <div className="mx-auto max-w-7xl h-full">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm min-h-[85vh] p-4 lg:p-6">
              
              <Outlet /> 

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default Home_page;
