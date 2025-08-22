import React from "react";
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
  const Navigate=useNavigate();
  const LoginButt=()=>{
    Navigate('/login');
  }
  const SignupButt=()=>{
    Navigate('/signup');
  }
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-1 py-5 bg-orange-500 text-white shadow-md">
        <h1 className="text-3xl font-extrabold tracking-wide">
          TaskFlow
        </h1>
        <div className="space-x-4">
          <button className="px-5 py-2 border border-white rounded-lg hover:bg-white hover:text-orange-500 transition duration-300" onClick={LoginButt}>
            Login
          </button>
          <button className="px-5 py-2 bg-white text-orange-500 rounded-lg hover:bg-orange-100 transition duration-300" onClick={SignupButt}>
            Signup
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-orange-50">
        {/* Left Content */}
        <div className="max-w-xl space-y-6 animate-fadeIn">
          <h2 className="text-5xl font-bold leading-tight">
            Stay Organized, <br />
            <span className="text-orange-500">Get More Done</span>
          </h2>
          <p className="text-gray-700 text-lg">
            TaskFlow helps you manage, track, and complete tasks effortlessly.
            Stay productive with our clean and easy-to-use interface.
          </p>
        </div>

        {/* Right Image */}
        <div className="mt-10 md:mt-0 animate-slideIn">
          <img
            src="https://cdn-icons-png.flaticon.com/512/906/906334.png"
            alt="Task Manager Illustration"
            className="w-96 drop-shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="py-16 px-8 bg-white">
        <h3 className="text-3xl font-bold text-center text-orange-500 mb-12">
          Why Choose TaskFlow?
        </h3>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="p-6 bg-orange-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827370.png"
              alt="Easy to Use"
              className="w-16 mb-4"
            />
            <h4 className="text-xl font-bold text-orange-500 mb-2">Easy to Use</h4>
            <p className="text-gray-600">
              A clean, intuitive interface that makes managing your tasks simple and fast.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-orange-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2910/2910768.png"
              alt="Track Progress"
              className="w-16 mb-4"
            />
            <h4 className="text-xl font-bold text-orange-500 mb-2">Track Progress</h4>
            <p className="text-gray-600">
              Visualize your task completion rate and stay motivated to finish more.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-orange-200 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
              alt="Stay Notified"
              className="w-16 mb-4"
            />
            <h4 className="text-xl font-bold text-orange-500 mb-2">Stay Notified</h4>
            <p className="text-gray-600">
              Get timely reminders so you never miss an important deadline.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 text-center text-gray-500 bg-orange-100">
        © {new Date().getFullYear()} TaskFlow. All rights reserved.
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideIn {
            from { opacity: 0; transform: translateX(50px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-slideIn {
            animation: slideIn 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
