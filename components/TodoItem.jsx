"use client";

import { useState } from "react";

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const isOverdue =
    todo.dueDate !== "" && todo.dueDate < getTodayDateString() && !todo.completed;

  function startEditing() {
    setEditText(todo.text);
    setIsEditing(true);
  }

  function finishEditing() {
    if (!isEditing) return;

    onEdit(todo.id, editText);
    setIsEditing(false);
  }

  function handleEditKeyDown(event) {
    if (event.key === "Enter") {
      finishEditing();
    }

    if (event.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  }

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <div className="todo-content">
        {isEditing ? (
          <input
            className="todo-edit-input"
            type="text"
            value={editText}
            autoFocus
            onBlur={finishEditing}
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={handleEditKeyDown}
          />
        ) : (
          <button
            type="button"
            className={`todo-text ${todo.completed ? "completed" : ""}`}
            onClick={startEditing}
          >
            {todo.text}
          </button>
        )}
        {todo.dueDate && (
          <span className={`todo-due-date ${isOverdue ? "overdue" : ""}`}>
            Due: {todo.dueDate}
          </span>
        )}
      </div>
      <button type="button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}
