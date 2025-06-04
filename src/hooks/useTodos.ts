import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import type { Todo, FilterType } from '../types/todoTypes';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<FilterType>('all');

  const addTodo = useCallback((text: string) => {
    setTodos(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: Date.now(),
      },
    ]);
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setTodos]);

  const editTodo = useCallback((id: string, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  }, [setTodos]);

  const reorderTodos = useCallback((dragId: string, hoverId: string) => {
    setTodos(prev => {
      const dragIndex = prev.findIndex(todo => todo.id === dragId);
      const hoverIndex = prev.findIndex(todo => todo.id === hoverId);
      
      if (dragIndex === -1 || hoverIndex === -1) return prev;
      
      const newTodos = [...prev];
      const [draggedItem] = newTodos.splice(dragIndex, 1);
      newTodos.splice(hoverIndex, 0, draggedItem);
      
      return newTodos;
    });
  }, [setTodos]);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, [setTodos]);

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return {
    todos: filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    onReorder: reorderTodos,
    clearCompleted,
    activeCount,
    completedCount,
  };
}