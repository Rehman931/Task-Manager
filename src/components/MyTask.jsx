import React, { useState, useEffect } from "react";
import AddTask from "./AddTask";
import UpdateTask from "./UpdateTask";

const MyTask = ({ data }) => {
  const [AddTaskButt, setAdd] = useState(false);
  const [updateTask, setUpdateTask] = useState(null);
  const [makeUpdate, setUpdate] = useState(false);
  const [searchTask, setSearchTask] = useState("");

  // ✅ Edit function
  const editFunc = (task) => {
    setUpdateTask(task);
    setUpdate(true);
  };

  // ✅ open AddTask form if no tasks exist
  useEffect(() => {
    if (!data?.tasks || data.tasks.length === 0) {
      setAdd(true);
    }
  }, [data]);

  // ✅ Delete task
  const DeleteFunc = async (id) => {
    try {
      const res = await fetch(`http:///my-task-backend-hsio.onrender.com/DeleteTask?_id=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        console.log("Task Deleted");
        window.location.reload();
      } else console.log("Task not deleted. Something went wrong");
    } catch (error) {
      console.error("Server error, task not deleted");
    }
  };

  // ✅ Clear search input
  const clearSearch = () => {
    setSearchTask("");
  };

  return (
    <div className="w-full h-full p-4 shadow-sm font-sans leading-relaxed text-gray-800">
      {/* === Header/Search === */}
      <header className="w-full flex flex-col sm:flex-row items-center gap-3 justify-end mb-4">
        <div className="bg-white shadow-md rounded-md flex flex-row items-center justify-between p-2 gap-2 relative">
          <input
            type="text"
            name="SearchTask"
            placeholder="Search Item Here"
            className="w-28 sm:w-48 md:w-[30vw] h-8 sm:h-9 md:h-[5vh] border rounded-md text-center
              border-gray-500 focus:outline-none focus:ring-1
              focus:border-orange-500 focus:ring-orange-500
              text-xs sm:text-sm md:text-base pr-6"
            value={searchTask}
            onChange={(e) => setSearchTask(e.target.value)}
          />
          {searchTask && (
            <button
              className="absolute right-2 text-gray-500 hover:text-gray-700"
              onClick={clearSearch}
            >
              ✕
            </button>
          )}
        </div>
        <button
          className="bg-orange-500 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm md:text-base w-[20vw] sm:w-auto rounded-md border
            border-orange-700 shadow-sm active:scale-95 transition"
          onClick={() => setAdd(true)}
        >
          Add Task
        </button>
      </header>

      {/* === Render AddTask or UpdateTask or Tasks list === */}
      {AddTaskButt ? (
        <AddTask setAdd={setAdd} data={data} />
      ) : makeUpdate ? (
        <UpdateTask
          setUpdate={setUpdate}
          task={updateTask}
          setUpdateTask={setUpdateTask}
        />
      ) : (
        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.tasks?.map((task, index) => {
            const isHighlighted =
              searchTask &&
              task.title.toLowerCase().includes(searchTask.toLowerCase());

            return (
              <div
                key={task._id || index}
                className={`${
                  isHighlighted ? "bg-orange-300" : "bg-white"
                } p-5 rounded-xl shadow-md flex flex-col gap-2 border border-gray-200 hover:shadow-lg transition`}
              >
                <h3 className="text-lg font-semibold">{task.title}</h3>

                <div className="flex flex-col gap-1 text-sm">
                  <p>
                    <span className="font-medium">Description:</span>{" "}
                    {task.description}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> {task.status}
                  </p>
                  <p>
                    <span className="font-medium">Priority:</span>{" "}
                    {task.priority}
                  </p>
                  <p>
                    <span className="font-medium">Created At:</span>{" "}
                    {task.createdAt
                      ? new Date(task.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Due Date:</span>{" "}
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                    onClick={() => DeleteFunc(task._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="px-3 py-1 bg-green-500 text-white rounded-md"
                    onClick={() => editFunc(task)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyTask;
