import React from 'react';
import { Check, Trash2, Clock, PartyPopper } from 'lucide-react';
import { useTodoStore } from '../store';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function TodoList() {
  const { todos, filter, deleteTodo, toggleTodo } = useTodoStore();

  const handleToggle = (id: string, currentStatus: string, title: string) => {
    toggleTodo(id);
    
    if (currentStatus === 'active') {
      // Play completion sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2186/2186-preview.mp3');
      audio.play();

      // Show completion toast
      toast.custom((t) => (
        <div className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <PartyPopper className="h-10 w-10 text-yellow-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Task Completed! 🎉
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Great job completing: {title}
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-200">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      ), {
        duration: 3000,
        position: 'top-center',
      });
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    return todo.status === filter;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'health': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-orange-100 text-orange-800';
      case 'birthday': return 'bg-pink-100 text-pink-800';
      case 'event': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className={`bg-white p-4 rounded-lg shadow-md transition-all ${
            todo.status === 'completed' ? 'opacity-60' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <button
                onClick={() => handleToggle(todo.id, todo.status, todo.title)}
                className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  todo.status === 'completed'
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {todo.status === 'completed' && <Check size={12} className="text-white" />}
              </button>
              
              <div className="space-y-1">
                <h3 className={`font-medium ${
                  todo.status === 'completed' ? 'line-through text-gray-500' : ''
                }`}>
                  {todo.title}
                </h3>
                {todo.description && (
                  <p className="text-gray-600 text-sm">{todo.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(todo.category)}`}>
                    {todo.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                  </span>
                  {todo.dueDate && (
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      Due: {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                    </span>
                  )}
                  {todo.scheduledTime && (
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 flex items-center gap-1">
                      <Clock size={12} />
                      {format(new Date(todo.scheduledTime), 'MMM d, h:mm a')}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
      
      {filteredTodos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tasks found
        </div>
      )}
    </div>
  );
}