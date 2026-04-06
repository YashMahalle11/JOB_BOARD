import { useState } from "react";
import { registerUser } from "../services/authService";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant",
  });

  const handleRegister = async () => {
    try {
      await registerUser(form);
      alert("Registered successfully");
    } catch {
      alert("Error");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Name" onChange={(e) => setForm({...form, name: e.target.value})} />
      <input placeholder="Email" onChange={(e) => setForm({...form, email: e.target.value})} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({...form, password: e.target.value})} />

      <select onChange={(e) => setForm({...form, role: e.target.value})}>
        <option value="applicant">Applicant</option>
        <option value="company">Company</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}