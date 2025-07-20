import React, { useState } from "react";

export default function TodoInput({ addTodo }) {
  const [inputText, setInputText] = useState("");

  // Update input state on change
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle form submit (Add todo)
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedText = inputText.trim();
    if (!trimmedText) return; // Prevent adding empty todos

    addTodo(trimmedText); // Pass trimmed text to addTodo function
    setInputText("");     // Clear input after adding
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Add new todo"
      style={{
        marginBottom: "1rem",
        display: "flex",
        gap: "0.5rem",
      }}
    >
      <input
        type="text"
        value={inputText}
        onChange={handleChange}
        placeholder="Add new todo..."
        aria-label="New todo"
        style={{
          flexGrow: 1,
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        aria-label="Add todo"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#2563eb",
          color: "white",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#1e40af")}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#2563eb")}
      >
        Add
      </button>
    </form>
  );
}
