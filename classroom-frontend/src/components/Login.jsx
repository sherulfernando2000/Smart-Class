import React, { useState } from "react";
import InputField from "./LoginComponents/InputField";
import SocialLogin from "./LoginComponents/SocialLogin";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login attempted with:", { email, password });
    const data = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        data
      );
      console.log("after response");
      if (response.data.status === 200) {
        console.log("in if");
        const { role, token } = response.data.data;
        console.log("role", role);

        localStorage.setItem("token", token);
        if (role === "ADMIN") {
          navigate("/indexclass");
          alert("Logged in as Admin");
        } else if (role === "TEACHER") {
          navigate("/teacherindexclass");
          alert("Logged in as Teacher");
        } else {
          setError(response.data.message);
          alert(response.data.message);
        }
      } else if (response.status == 401) {
        setError("Invalid email or password.");
        alert(response.data.message);
        console.error("Login error:", err);
      }
    } catch (err) {
      setError("Invalid email or password.");
      alert("Invalid email or password.");
      console.error("Login error:", err);
    }
  };

  // // api call check role and token
  // console.log('Login attempted with:', { email, password });
  // navigate("/indexclass");
  // // Add your login logic here (e.g., API call)

  return (
    <section className="loginbody">
      <div className="login-container">
        <h2 className="form-title">Sign in with</h2>
        <SocialLogin />
        <p className="separator">
          <span>or</span>
        </p>
        <form onSubmit={handleSubmit} className="login-form">
          <InputField
            type="email"
            placeholder="Email address"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a href="#" className="forgot-password-link">
            Forgot password?
          </a>
          <button className="login-button">Log In</button>
          
        </form>
        <p className="signup-prompt">
          Don&apos;t have an account?{" "}
          <a
            href="#"
            className="signup-link"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </a>
        </p>
      </div>
    </section>
  );
}

export default Login;

{
  /* <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div> */
}
