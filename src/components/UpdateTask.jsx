import React, { useState } from "react";

const UpdateTask = ({ task, setUpdateTask, setUpdate }) => {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [status, setStatus] = useState(task.status || "Pending");
  const [priority, setPriority] = useState(task.priority || "Low");

  const handleUpdate = async () => {
    const updatedFields = {};
    updatedFields._id=task._id;
    if (title !== task.title) updatedFields.title = title;
    if (description !== task.description)
      updatedFields.description = description;
    if (status !== task.status) updatedFields.status = status;
    if (priority !== task.priority) updatedFields.priority = priority;

    try {
      const res = await fetch(`http://my-task-backend-hsio.onrender.com/UpdateTask`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });

      if (res.ok) {
        const result = await res.json();
        setUpdate(false);
        setUpdateTask(null);
        window.location.reload();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl bg-white shadow-xl shadow-orange-300 p-6 font-sans">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-orange-500">Update Task</h2>
        <button
          className="text-orange-500 hover:text-orange-600"
          onClick={() => {
            setUpdate(false);
            setUpdateTask(null);
          }}
        >
          X
        </button>
      </div>

      {/* Title */}
      <div className="flex flex-col gap-1 mb-3">
        <label className="text-base font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-11 px-3 w-full rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 mb-3">
        <label className="text-base font-semibold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="min-h-[100px] p-3 w-full rounded-md border border-gray-300 resize-y focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        ></textarea>
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1 mb-3">
        <label className="text-base font-semibold">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 px-3 w-full rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="OverDue">OverDue</option>
        </select>
      </div>

      {/* Priority */}
      <div className="flex flex-col gap-1 mb-6">
        <label className="text-base font-semibold">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="h-11 px-3 w-full rounded-md border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Footer */}
      <button
        onClick={handleUpdate}
        className="w-full h-11 rounded-md bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateTask;
