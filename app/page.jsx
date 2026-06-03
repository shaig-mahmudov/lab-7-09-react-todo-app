"use client";

import { useState } from "react";
import TodoFilter from "../components/TodoFilter";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import TodoStats from "../components/TodoStats";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddTodo(text, dueDate) {
    const newTodo = {
      id: Date.now(),
      text,
      dueDate,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  }

  function handleToggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  function handleDeleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleEditTodo(id, text) {
    const trimmedText = text.trim();
    if (trimmedText === "") {
      handleDeleteTodo(id);
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: trimmedText } : todo,
      ),
    );
  }

  function handleClearCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function handleToggleAll() {
    const shouldCompleteAll = !todos.every((todo) => todo.completed);
    setTodos(
      todos.map((todo) => ({ ...todo, completed: shouldCompleteAll })),
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const hasTodos = todos.length > 0;
  const hasCompletedTodos = completedCount > 0;
  const allTodosCompleted = hasTodos && todos.every((todo) => todo.completed);

  return (
    <main className="todo-app">
      <h1>Todo App</h1>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
      />
      {hasTodos && (
        <div className="todo-actions">
          <button type="button" onClick={handleToggleAll}>
            {allTodosCompleted ? "Mark All Active" : "Mark All Complete"}
          </button>
          {hasCompletedTodos && (
            <button type="button" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          )}
        </div>
      )}
      <TodoStats todos={todos} />
    </main>
  );
}
