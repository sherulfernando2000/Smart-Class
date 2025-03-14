import React, { useState } from 'react';
import InputField from './LoginComponents/InputField';
import SocialLogin from './LoginComponents/SocialLogin';
import './Login.css'; // You can rename this to Signup.css if needed
import { useNavigate } from "react-router-dom";

function Signup() {
 const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Signup attempted with:', { name, email, password });
    // Add your signup logic here (e.g., API call)
  };

  return (
    <section className="loginbody">
    <div className="login-container"> {/* Optional: Rename to signup-container */}
      <h2 className="form-title">Sign up with</h2>
      <SocialLogin />
      <p className="separator">
        <span>or</span>
      </p>
      <form onSubmit={handleSubmit} className="login-form"> {/* Optional: Rename to signup-form */}
        <InputField
          type="text"
          placeholder="Full Name"
          icon="person"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <InputField
          type="password"
          placeholder="Confirm Password"
          icon="lock"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="login-button"> {/* Optional: Rename to signup-button */}
          Sign Up
        </button>
      </form>
      <p className="signup-prompt">
        Already have an account?{' '}
        <a href="#" className="signup-link" onClick={()=>navigate("/login")}>
          Sign In
        </a>
      </p>
    </div>
    </section>
  );
}

export default Signup;