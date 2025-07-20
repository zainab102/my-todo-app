import React from "react";

const TodoCard = ({
  todo,
  selectedTab,
  toggleComplete,
  redoTask,
  deleteTodo,
  restoreTodo,
  deleteForever,
}) => {
  // Set card background color based on status & tab
  const getCardStyle = () => {
    if (selectedTab === "Deleted") {
      return { backgroundColor: "#ffe6e6" }; // light red for deleted
    }
    if (todo.completed) {
      return { backgroundColor: "#e0ffe0" }; // light green for completed
    }
    return { backgroundColor: "#f5f5f5" }; // light grey for open
  };

  return (
    <div
      className="todo-card"
      style={{
        ...getCardStyle(),
        padding: "1rem",
        margin: "0.5rem 0",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          flexGrow: 1,
          textDecoration: todo.completed ? "line-through" : "none",
          wordBreak: "break-word",
        }}
        title={todo.text}
      >
        {todo.text}
      </p>

      <div
        className="todo-actions"
        style={{ display: "flex", gap: "0.5rem", marginLeft: "1rem" }}
      >
        {/* Show buttons depending on tab and task state */}

        {/* In All tab */}
        {selectedTab === "All" && !todo.completed && (
          <button
            onClick={() => toggleComplete(todo.id)}
            title="Mark as done"
            style={buttonStyle}
          >
            Done
          </button>
        )}
        {selectedTab === "All" && todo.completed && (
          <button
            onClick={() => redoTask(todo.id)}
            title="Redo task"
            style={buttonStyle}
          >
            Redo
          </button>
        )}

        {/* In Open tab */}
        {selectedTab === "Open" && (
          <button
            onClick={() => toggleComplete(todo.id)}
            title="Mark as done"
            style={buttonStyle}
          >
            Done
          </button>
        )}

        {/* In Completed tab */}
        {selectedTab === "Completed" && (
          <button
            onClick={() => redoTask(todo.id)}
            title="Redo task"
            style={buttonStyle}
          >
            Redo
          </button>
        )}

        {/* Delete button in all except Deleted tab */}
        {selectedTab !== "Deleted" && (
          <button
            onClick={() => deleteTodo(todo.id)}
            title="Delete task"
            style={{ ...buttonStyle, backgroundColor: "#dc3545" }}
          >
            Delete
          </button>
        )}

        {/* Undo and Delete Forever buttons in Deleted tab */}
        {selectedTab === "Deleted" && (
          <>
            <button
              onClick={() => restoreTodo(todo.id)}
              title="Restore task"
              style={{ ...buttonStyle, backgroundColor: "#28a745" }}
            >
              Undo
            </button>
            <button
              onClick={() => deleteForever(todo.id)}
              title="Delete forever"
              style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
            >
              Delete Forever
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Shared button styles
const buttonStyle = {
  padding: "0.3rem 0.6rem",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
  fontSize: "0.9rem",
  transition: "background-color 0.3s ease",
};

export default TodoCard;
