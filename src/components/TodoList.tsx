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

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (hoverId: string) => {
    if (!draggedId || draggedId === hoverId) return;
    
    onReorder(draggedId, hoverId);
    setDraggedId(hoverId);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
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
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          isDragging={draggedId === todo.id}
        />
      ))}
    </ul>
  );
}