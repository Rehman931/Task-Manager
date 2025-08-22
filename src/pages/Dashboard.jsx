import React, { useState, useEffect } from "react";
import DashSidebar from "../components/DashSidebar";
import Docs from "../components/Docs";
import MyTasks from "../components/MyTask";
import DashMain from "../components/DashMain";

const Dashboard = () => {
  // Load from localStorage or default to 1
  const [clickComp, setClick] = useState(() => {
    const saved = localStorage.getItem("clickComp");
    return saved ? JSON.parse(saved) : 1;
  });

  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jwtToken = localStorage.getItem("token");
  const [sidebarButt, setSidebar] = useState(false);

  // ✅ Make HeightSide reactive with state
  const [heightSide, setHeightSide] = useState("h-[6vh]");

  useEffect(() => {
    if (sidebarButt === false) {
      setHeightSide("h-[6vh]");
    } else {
      setHeightSide("h-full");
    }
  }, [sidebarButt]);

  useEffect(() => {
    if (jwtToken) {
      async function fetchAuth() {
        try {
          const response = await fetch("http:///my-task-backend-hsio.onrender.com/dashboard/auth", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`, // send token
            },
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          setAuthData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }

      fetchAuth();
    } else {
      setError("No JWT token in local storage");
      setLoading(false);
    }
  }, [jwtToken]);

  // Save clickComp in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("clickComp", JSON.stringify(clickComp));
  }, [clickComp]);

  // Decide which component to render
  let content;
  switch (clickComp) {
    case 1:
      content = <DashMain data={authData} />;
      break;
    case 2:
      content = <MyTasks data={authData} />;
      break;
    case 4:
      content = <Docs />;
      break;
    default:
      content = <DashMain data={authData} />;
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen w-full flex flex-row bg-orange-200">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 ${heightSide} `}>
        <DashSidebar
          setClick={setClick}
          setSidebar={setSidebar}
          sidebarButt={sidebarButt}
        />
      </div>
      <div className="flex-1">{content}</div>
    </div>
  );
};

export default Dashboard;
