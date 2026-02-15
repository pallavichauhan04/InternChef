import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      const user = { name, email, password };
      localStorage.setItem("internchef_user", JSON.stringify(user));
      alert("Registered successfully! Please login.");
      setIsRegister(false);
    } else {
      const storedUser = JSON.parse(localStorage.getItem("internchef_user"));

      if (
        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ) {
        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Please register first.");
      }
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>InternChef</h1>
      <p>Cooking trusted opportunities for your career</p>

      <h2>{isRegister ? "Register" : "Login"}</h2>

      <form onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br /><br />
          </>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      <br />

      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister
          ? "Already have an account? Login"
          : "No account? Register"}
      </button>
    </div>
  );
}

export default Login;