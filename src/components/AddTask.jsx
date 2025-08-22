import React, { useEffect, useState } from "react";

const AddTask = ({ setAdd, data }) => {
  const [AddTitle, setTitle] = useState("-- No Title --");
  const [AddDescrip, setDescrip] = useState("-- No Description --");
  const [AddPrio, setPrio] = useState("Low");
  const [AddStatus, setStatus] = useState("Pending");

  const AddTaskfunc = async () => {
    const jwtToken = localStorage.getItem("token"); // get JWT

    try {
      const res = await fetch("http://my-task-backend-hsio.onrender.com/AddTask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`, // send token
        },
        body: JSON.stringify({
          title: AddTitle,
          description: AddDescrip,
          status: AddStatus,
          priority: AddPrio,
        }),
      });

      if (!res.ok) throw new Error("Failed to add task");

      const result = await res.json();
      if (result.success == true) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Task not added:", error.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-white shadow-xl shadow-orange-300 p-6 font-sans">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-orange-500">Add New Task</h2>
        <button
          className="text-orange-500 hover:text-orange-600"
          onClick={() => {
            setAdd(false);
          }}
        >
          X
        </button>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="Title" className="text-base font-semibold">
          Title
        </label>
        <input
          type="text"
          id="Title"
          placeholder="Enter Title"
          className="h-11 px-3 w-full rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="description" className="text-base font-semibold">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter Description"
          className="min-h-[100px] p-3 w-full rounded-md border border-gray-300 resize-y focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          onChange={(e) => {
            setDescrip(e.target.value);
          }}
        ></textarea>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="Status" className="text-base font-semibold">
          Status
        </label>
        <select
          id="Status"
          className="h-11 px-3 w-full rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        >
          <option value="">-- Select an option --</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="OverDue">OverDue</option>
        </select>
      </div>

      {/* Priority */}
      <div className="flex flex-col gap-1 mb-6">
        <label htmlFor="Priority" className="text-base font-semibold">
          Priority
        </label>
        <select
          id="Priority"
          className="h-11 px-3 w-full rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
          onChange={(e) => {
            setPrio(e.target.value);
          }}
        >
          <option value="">-- Select an option --</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Footer */}
      <button
        className="w-full h-11 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
        onClick={AddTaskfunc}
      >
        Add Task
      </button>
    </div>
  );
};

export default AddTask;
