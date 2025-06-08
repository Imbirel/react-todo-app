import { useState } from 'react';
import type { Todo } from '../types/todoTypes';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onReorder: (dragId: string, hoverId: string) => void;
};

export function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }: TodoListProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (!draggedId) return;
    setHoverId(id);
  };

  const handleDragEnd = () => {
    if (draggedId && hoverId && draggedId !== hoverId) {
      onReorder(draggedId, hoverId);
    }
    setDraggedId(null);
    setHoverId(null);
  };

  if (todos.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">
        No todos found.
      </div>
    );
  }

  return (
    <ul className="max-h-160 divide-y divide-gray-200 dark:divide-gray-700 rounded-b-lg bg-white dark:bg-gray-800 shadow overflow-y-auto dark:[color-scheme:dark]">
      {todos.map(todo => (
        <li
          key={todo.id}
          onDragOver={(e) => handleDragOver(e, todo.id)}
          className={hoverId === todo.id ? 'bg-gray-100 dark:bg-gray-700' : ''}
        >
          <TodoItem
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            isDragging={draggedId === todo.id}
          />
        </li>
      ))}
    </ul>
  );
}