import React, { useState } from "react";
import TodoList from "./Components/TodoList";

function App() {
  // State
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedTab, setSelectedTab] = useState("All");

  // Add new todo
  const addTodo = () => {
    if (!input.trim()) return; // Prevent empty todos

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      deleted: false,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
  };

  // Toggle completed status
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Mark completed task as open again
  const redoTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: false } : todo
      )
    );
  };

  // Soft delete task (move to deleted)
  const deleteTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, deleted: true } : todo
      )
    );
  };

  // Restore soft deleted task
  const restoreTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, deleted: false } : todo
      )
    );
  };

  // Permanently delete task
  const deleteForever = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear all non-deleted todos (soft delete all open/completed)
  const clearAllToDeleted = () => {
    setTodos(todos.map((todo) => ({ ...todo, deleted: true })));
  };

  // Permanently delete all soft-deleted todos
  const deleteAllForever = () => {
    setTodos(todos.filter((todo) => !todo.deleted));
  };

  return (
    <div
      className="app-container"
      style={{ maxWidth: 600, margin: "2rem auto", padding: "0 1rem" }}
    >
      <h1 style={{ textAlign: "center" }}>Todo App</h1>

      {/* Tabs */}
      <div
        className="tabs"
        style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1rem" }}
      >
        {["All", "Open", "Completed", "Deleted"].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: selectedTab === tab ? "2px solid #007BFF" : "1px solid #ccc",
              backgroundColor: selectedTab === tab ? "#e7f1ff" : "#fff",
              cursor: "pointer",
              fontWeight: selectedTab === tab ? "bold" : "normal",
            }}
            aria-current={selectedTab === tab ? "page" : undefined}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Input Section (hide in Deleted tab) */}
      {selectedTab !== "Deleted" && (
        <div
          className="input-section"
          style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task"
            style={{ flexGrow: 1, padding: "0.5rem", borderRadius: "4px", border: "1px solid #ccc" }}
            aria-label="New task"
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#007BFF",
              color: "#fff",
              cursor: "pointer",
            }}
            title="Add new task"
          >
            Add
          </button>
        </div>
      )}

      {/* Clear All button (All/Open/Completed tabs) */}
      {selectedTab !== "Deleted" && todos.some((todo) => !todo.deleted) && (
        <button
          onClick={clearAllToDeleted}
          style={{
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginBottom: "1rem",
            display: "block",
            marginLeft: "auto",
          }}
          title="Move all tasks to Deleted"
        >
          Clear All
        </button>
      )}

      {/* Delete All Forever button (Deleted tab only) */}
      {selectedTab === "Deleted" && todos.some((todo) => todo.deleted) && (
        <button
          onClick={deleteAllForever}
          style={{
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            marginBottom: "1rem",
            display: "block",
            marginLeft: "auto",
          }}
          title="Permanently delete all deleted tasks"
        >
          Delete All Forever
        </button>
      )}

      {/* Todo List */}
      <TodoList
        todos={todos}
        selectedTab={selectedTab}
        toggleComplete={toggleComplete}
        redoTask={redoTask}
        deleteTodo={deleteTodo}
        restoreTodo={restoreTodo}
        deleteForever={deleteForever}
      />
    </div>
  );
}

export default App;
