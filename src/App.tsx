import { useTodos } from './hooks/useTodos';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { Filter } from './components/Filter';
import { ThemeToggle } from './components/ThemeToggle';

export function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    onReorder,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos();

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 transition-colors duration-200">
      <div className="mx-auto max-w-lg px-4 py-10">
        <h1 className="mb-6 text-center text-4xl font-light text-zinc-800 dark:text-zinc-200">
          To-do list
        </h1>

        <div className="space-y-4">
          <AddTodo onAdd={addTodo} />
          
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
            onReorder={onReorder}
          />
        </div>
        
        <footer className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-800 shadow-lg py-3 px-4">
          <div className="max-w-md mx-auto flex justify-between items-center">
            <span className="basis-1/5 text-center text-sm text-zinc-500 dark:text-zinc-300">
              {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
            </span>
            
            <Filter
              activeFilter={filter}
              setFilter={setFilter}
            />
            
            <button 
              disabled={!(completedCount > 0)}
              onClick={clearCompleted}
              className="basis-1/4 text-sm text-zinc-500 hover:text-accentcolor disabled:hover:text-zinc-500 dark:text-zinc-300 disabled:hover:dark:text-zinc-300"
            >
              Clear completed
            </button>
          </div>
          
          <div className="max-w-md mx-auto flex justify-center space-x-6 mt-3">
            <ThemeToggle />
            <a 
              href="https://github.com/Imbirel/react-todo-app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 dark:text-zinc-300 hover:text-accentcolor"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;