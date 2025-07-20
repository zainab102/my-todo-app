import React from "react";
import TodoCard from "./TodoCards";

const TodoList = React.memo(function TodoList({
  todos,
  selectedTab,
  toggleComplete,
  redoTask,
  deleteTodo,
  restoreTodo,
  deleteForever,
}) {
  const visibleTodos = React.useMemo(() => {
    switch (selectedTab) {
      case "All":
        // Show all non-deleted tasks (open + completed)
        return todos.filter((todo) => !todo.deleted);

      case "Open":
        // Only open (not completed, not deleted)
        return todos.filter((todo) => !todo.completed && !todo.deleted);

      case "Completed":
        // Only completed (not deleted)
        return todos.filter((todo) => todo.completed && !todo.deleted);

      case "Deleted":
        // Only deleted
        return todos.filter((todo) => todo.deleted);

      default:
        return [];
    }
  }, [todos, selectedTab]);

  if (visibleTodos.length === 0) {
    return <p style={{ marginTop: "1rem", textAlign: "center" }}>No tasks to show.</p>;
  }

  return (
    <div className="todo-list" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {visibleTodos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          selectedTab={selectedTab}
          toggleComplete={toggleComplete}
          redoTask={redoTask}
          deleteTodo={deleteTodo}
          restoreTodo={restoreTodo}
          deleteForever={deleteForever}
        />
      ))}
    </div>
  );
});

export default TodoList;
