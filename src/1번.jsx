import React, { useState } from "react";

// Use functional or class component based on your preference.
// Make it a default export.

export default function LoginForm({ onSubmit }) {
  const [enteredUserName, setEnteredUserName] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  const handleChangeUserName = (event) => {
    setEnteredUserName(event.target.value);
  };

  const handleChangePassword = (event) => {
    setEnteredPassword(event.target.value);
  };

  return (
    <div>
      <label htmlFor="username-input">Username</label>
      <input
        id="username-input"
        type="text"
        value={enteredUserName}
        onChange={handleChangeUserName}
      />
      <label htmlFor="password-input">Password</label>
      <input
        id="password-input"
        type="password"
        value={enteredPassword}
        onChange={handleChangePassword}
      />
      <button
        id="login-button"
        onClick={() => onSubmit(enteredUserName, enteredPassword)}
        disabled={enteredUserName.length === 0 || enteredPassword.length === 0}
      >
        Submit button
      </button>
    </div>
  );
}
