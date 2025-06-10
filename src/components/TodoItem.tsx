import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types/todoTypes';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
};

export function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragEnd,
  isDragging
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(todo.id, trimmedText);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleEdit();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div
      draggable="true"
      onDragStart={() => onDragStart(todo.id)}
      onDragEnd={onDragEnd}
      className={`group flex items-center border-b border-zinc-200 last:border-b-0 dark:border-zinc-700 px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      aria-label={todo.text}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={`h-6 w-6 accent-accentcolor ${
          todo.completed
            ? 'shadow-lg shadow-accentcolor/40'
            : ''
        }`}
        aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
      />

      {isEditing ? (
        <input
          ref={inputRef}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="ml-3 flex-1 rounded border border-zinc-300 px-2 py-1 text-zinc-700 dark:text-zinc-200 dark:bg-zinc-700 focus:border-accentcolor focus:outline-none focus:ring-1 focus:ring-accentcolor"
          aria-label="Edit todo"
        />
      ) : (
        <span
          title="Double-click to edit. Can be dragged"
          onDoubleClick={() => setIsEditing(true)}
          className={`ml-3 flex-1 ${
            todo.completed
              ? 'text-zinc-400 line-through'
              : 'text-zinc-800 dark:text-zinc-300'
          }`}
        >
          {todo.text}
        </span>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        title="Delete todo"
        aria-label="Delete todo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-zinc-400 hover:text-red-500 dark:text-zinc-500 dark:hover:text-red-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
}