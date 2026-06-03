"use client";

import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim() === "") return;

    onAddTodo(text.trim(), dueDate);
    setText("");
    setDueDate("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <input
        type="date"
        aria-label="Due date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
