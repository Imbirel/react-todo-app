import type { FormEvent } from 'react';
import { useState } from 'react';

type AddTodoProps = {
  onAdd: (text: string) => void;
};

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 shadow-sm">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full rounded-t-lg border-0 py-4 pl-12 pr-4 text-lg text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accentcolor"
          autoFocus
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-400">
          ➕
        </span>
      </div>
    </form>
  );
}