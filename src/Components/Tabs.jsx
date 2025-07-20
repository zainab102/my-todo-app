import React from "react";

export function Tabs({ tabs, selectedTab, onSelectTab }) {
  return (
    <nav aria-label="Todo list tabs" style={styles.nav}>
      <ul role="tablist" style={styles.list}>
        {tabs.map((tab) => {
          const isSelected = tab === selectedTab;
          return (
            <li key={tab} style={styles.listItem}>
              <button
                type="button"
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => onSelectTab(tab)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const currentIndex = tabs.indexOf(selectedTab);
                    const nextIndex =
                      e.key === "ArrowRight"
                        ? (currentIndex + 1) % tabs.length
                        : (currentIndex - 1 + tabs.length) % tabs.length;
                    onSelectTab(tabs[nextIndex]);
                  }
                }}
                style={{
                  ...styles.button,
                  ...(isSelected ? styles.selectedButton : {}),
                }}
              >
                {tab}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    marginBottom: "1rem",
  },
  list: {
    display: "flex",
    listStyle: "none",
    padding: 0,
    margin: 0,
    gap: "0.75rem",
  },
  listItem: {},
  button: {
    background: "none",
    border: "2px solid transparent",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "border-color 0.3s, background-color 0.3s",
    outline: "none",
  },
  selectedButton: {
    borderColor: "#4f46e5", // Indigo-600
    backgroundColor: "#e0e7ff", // Indigo-100
    fontWeight: "bold",
  },
};
