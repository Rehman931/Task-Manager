import React, { useEffect, useState } from "react";

const DashSidebar = ({ setClick }) => {
  const [sidebarButt, setSidebar] = useState(false);
  const [sidewidth,setSideWidth]=useState(64);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 586) {
        setSideWidth(12);
        setSidebar(false);
      }
    };


    // run once on mount:
    handleResize();

    // add resize listener
    window.addEventListener("resize", handleResize);
    
    // cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; // change as needed
  };
  
  return (
    <>
      {sidebarButt ? (
        <aside className={`bg-orange-500 shadow-2xl flex flex-col h-[100vh] w-[${sidewidth}rem] p-3 shadow-slate-900`}>
          <div className="text-white text-4xl font-bold font-serif flex justify-center py-4 gap-3">
            TaskFlow
            <button
              className="bg-white text-red-600 hover:text-black text-2xl font-sans font-normal  rounded-md "
              onClick={() => {
                setSidebar(false);
              }}
            >
              X
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-4 flex flex-col items-center justify-evenly text-xl text-white font-normal">
            <button
              onClick={() => setClick(1)}
              className="w-full py-2 px-3 rounded hover:bg-orange-600 text-left"
            >
              📊 Dashboard
            </button>
            <button
              onClick={() => setClick(2)}
              className="w-full py-2 px-3 rounded hover:bg-orange-600 text-left"
            >
              📝 My Tasks
            </button>
            <button
              onClick={handleRefresh}
              className="w-full py-2 px-3 rounded hover:bg-orange-600 text-left"
            >
              🔃 Refresh
            </button>
            <button
              onClick={() => setClick(4)}
              className="w-full py-2 px-3 rounded hover:bg-orange-600 text-left"
            >
              📃 Docs
            </button>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full text-center bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              🚪 Logout
            </button>
          </div>
        </aside>
      ) : (
        <button
          className="bg-orange-600 rounded-md h-[5vh] w-[10vw] mt-5 ml-1"
          onClick={() => {
            setSidebar(true);
          }}
        >
          📜Open Sidebar
        </button>
      )}
    </>
  );
};

export default DashSidebar;
