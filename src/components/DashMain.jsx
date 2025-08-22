import React, { useState, useEffect } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const DashMain = ({ data }) => {
  const [checkauthData, setAuthdata] = useState(false);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [totalPending, setPending] = useState(0);
  const [totalOverdue, setTotalOverdue] = useState(0);
  const [totalInProgress, setTotalInProgress] = useState(0);

  useEffect(() => {
    if (data && Array.isArray(data.tasks)) {
      setAuthdata(data.tasks.length > 0);

      const completedCount = data.tasks.filter(
        (task) => task.status.toLowerCase() === "completed"
      ).length;
      const pendingCount = data.tasks.filter(
        (task) => task.status.toLowerCase() === "pending"
      ).length;
      const overdueCount = data.tasks.filter(
        (task) => task.status.toLowerCase() === "overdue"
      ).length;
      const inProgressCount = data.tasks.filter(
        (task) => task.status.toLowerCase() === "in-progress"
      ).length;

      setTotalCompleted(completedCount);
      setPending(pendingCount);
      setTotalOverdue(overdueCount);
      setTotalInProgress(inProgressCount);
    }
  }, [data]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-500";
      case "overdue":
        return "text-red-500";
      case "in-progress":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-blue-600";
      case "low":
        return "text-green-600";
      default:
        return "text-gray-500";
    }
  };

  // Chart Data
  const lineChartData = {
    labels: ["gap 1", "gap 2", "gap 3", "gap 4"],
    datasets: [
      {
        label: "Tasks Created",
        data: [totalCompleted, totalPending, totalOverdue, totalInProgress],
        borderColor: "#f97316",
        backgroundColor: "rgba(249, 115, 22, 0.3)",
        tension: 0.4,
      },
    ],
  };

  const doughnutChartData = {
    labels: ["Completed", "Pending", "Overdue", "In Progress"],
    datasets: [
      {
        data: [totalCompleted, totalPending, totalOverdue, totalInProgress],
        backgroundColor: ["#16a34a", "#eab308", "#dc2626", "#9333ea"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto space-y-8 bg-orange-50 font-serif">
      {checkauthData ? (
        <>
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { label: "Total Tasks", value: `${data.tasks.length}` },
              {
                label: "Completed",
                value: `${totalCompleted}`,
                color: "text-green-600",
              },
              {
                label: "Pending",
                value: `${totalPending}`,
                color: "text-yellow-500",
              },
              {
                label: "Overdue",
                value: `${totalOverdue}`,
                color: "text-red-500",
              },
              {
                label: "In Progress",
                value: `${totalInProgress}`,
                color: "text-purple-500",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <p className="text-gray-500">{card.label}</p>
                <h2 className={`text-3xl font-bold ${card.color || ""}`}>
                  {card.value}
                </h2>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold mb-3 text-orange-600">
                Tasks Over Time
              </h3>
              <Line data={lineChartData} />
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold mb-3 text-orange-600">
                Task Distribution
              </h3>
              <Doughnut data={doughnutChartData} />
            </div>
          </div>

          {/* Task Table */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-bold mb-4 text-orange-600">Task Table</h3>
            <table className="w-full text-left">
              <thead className="bg-orange-100">
                <tr className="border-b">
                  <th className="py-2 font-semibold">Task</th>
                  <th className="font-semibold">Status</th>
                  <th className="font-semibold">Priority</th>
                  <th className="font-semibold">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {data.tasks.map((task, index) => (
                  <tr
                    key={index}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-orange-50" : "bg-white"
                    }`}
                  >
                    <td className="py-2">{task.title || "Untitled Task"}</td>
                    <td>
                      <span className={getStatusColor(task.status)}>
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </span>
                    </td>
                    <td>{task.dueDate || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="w-full flex flex-col justify-center items-center">
          Task is not created yet. Create task first.
        </p>
      )}
    </main>
  );
};

export default DashMain;
