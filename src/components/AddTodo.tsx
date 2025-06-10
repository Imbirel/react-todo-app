import type { FormEvent } from 'react';
import { useState } from 'react';

type AddTodoProps = {
  onAdd: (text: string) => void;
};

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAdd(trimmedText);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 shadow-sm">
      <label htmlFor="add-todo-input" className="sr-only">
        Add new todo
      </label>
      <div className="relative">
        <input
          id="add-todo-input"
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full rounded-t-lg border-0 py-4 pl-12 pr-4 text-lg text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-accentcolor focus:shadow-lg focus:shadow-accentcolor/40"
          autoFocus
          aria-label="Add new todo"
          aria-live="polite"
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 transform text-zinc-400">
          ➕
        </span>
      </div>
    </form>
  );
}