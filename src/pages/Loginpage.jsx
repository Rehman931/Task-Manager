import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Loginpage = ({ setJwtToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state for password visibility
  const navigate = useNavigate();

  const SignupButt = () => {
    navigate("/signup", { replace: true });
  };

  const LoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http:///my-task-backend-hsio.onrender.com/login/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        setJwtToken(data.token); // update App state immediately
        navigate("/dashboard", { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-300">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md animate-fadeIn">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
          TaskMaster
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Welcome back! Please login to your account.
        </p>

        <form className="space-y-5" onSubmit={LoginSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-orange-500 hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Forgot Password?
          </a>
          <a
            className="hover:underline hover:cursor-pointer"
            onClick={SignupButt}
          >
            Create an Account
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Loginpage;
