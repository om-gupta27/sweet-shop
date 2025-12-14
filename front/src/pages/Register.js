import { useState } from "react";
import { apiRequest } from "../api/api";

function Register({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    try {
      await apiRequest("/api/auth/register", "POST", {
        email,
        password
      });

      alert("Registered successfully. Please login.");
      onDone();
    } catch (err) {
      alert(
        err?.detail ||
        err?.message ||
        "Registration failed"
      );
    }
  }

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;
