import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AddTodo } from './components/AddTodo';
import { TodoList } from './components/TodoList';
import { TodoFilters } from './components/TodoFilters';
import { ListChecks } from 'lucide-react';

function App() {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-600 p-3 rounded-lg">
            <ListChecks size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">To Do List</h1>
        </div>

        <AddTodo />
        <TodoFilters />
        <TodoList />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;