import React from "react";

const Docs = () => {
  return (
    <div className="w-full h-full p-6 bg-white rounded-lg shadow-sm font-sans leading-relaxed text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">App Documentation — Task Manager</h1>
        <div className="text-right">
          <div className="text-xs text-gray-500">Version</div>
          <div className="font-semibold">1.0.0</div>
        </div>
      </div>

      {/* Intro */}
      <p>
        This documentation explains the purpose, features, and usage of the Task Manager web app.
        It also covers benefits, FAQs, and troubleshooting tips.
      </p>

      {/* Section 1 */}
      <h2 className="text-lg font-semibold mt-6">1. What is this app?</h2>
      <p>
        Task Manager is a lightweight tool for creating, organizing, editing,
        tracking, and deleting tasks. It’s perfect for individuals or teams to
        manage daily work efficiently.
      </p>

      {/* Section 2 */}
      <h2 className="text-lg font-semibold mt-6">2. Key Features</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Add tasks via a quick inline form.</li>
        <li>Edit or delete tasks easily.</li>
        <li>Track progress with status updates.</li>
        <li>Supports priorities and due dates.</li>
        <li>Works with localStorage or backend APIs.</li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-lg font-semibold mt-6">3. How to use</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>Open the Task Manager app and go to "My Tasks".</li>
        <li>Click <strong>Add Task</strong> to open the form.</li>
        <li>Fill in the details and click Save.</li>
        <li>Edit, delete, or change the status anytime.</li>
      </ol>

      {/* Section 4 */}
      <h2 className="text-lg font-semibold mt-6">4. Add Task form</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Title</strong> — required</li>
        <li><strong>Description</strong> — optional</li>
        <li><strong>Priority</strong> — Low / Medium / High</li>
        <li><strong>Due Date</strong> — optional</li>
        <li><strong>Assignee</strong> — optional</li>
        <li><strong>Status</strong> — defaults to Todo</li>
      </ul>
      <p className="text-sm text-gray-600 mt-1">
        Tip: The form should open with focus on the first field and allow ESC to cancel.
      </p>

      {/* Section 5 */}
      <h2 className="text-lg font-semibold mt-6">5. Benefits</h2>
      <ul className="list-disc list-inside space-y-1">
        <li>Quick and easy task management.</li>
        <li>Clear task lifecycle.</li>
        <li>Minimal design keeps focus on work.</li>
        <li>Easy to extend with more features.</li>
      </ul>

      {/* Section 6 */}
      <h2 className="text-lg font-semibold mt-6">6. Troubleshooting</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>No tasks showing?</strong> Check storage or backend connection.</li>
        <li><strong>Form won’t open?</strong> Check button state and z-index.</li>
        <li><strong>Edits not saving?</strong> Ensure IDs are unique and update logic is correct.</li>
      </ul>

      {/* Footer */}
      <hr className="my-6" />
      <p className="text-sm text-gray-600">
        For bugs or feature requests, contact the development team or create an issue on the project repository.
      </p>
    </div>
  );
};

export default Docs;
