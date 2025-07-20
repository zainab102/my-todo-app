import React from "react";

export function Header({ title }) {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>{title}</h1>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#4f46e5",  // Indigo-600
    padding: "1rem",
    color: "white",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "1.8rem",
  },
};
