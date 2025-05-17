import React from 'react';
import { useTodoStore } from '../store';
import { Filter } from '../types';

export function TodoFilters() {
  const { todos, filter, setFilter } = useTodoStore();
  
  const totalTodos = todos.length;
  const activeTodos = todos.filter(todo => todo.status === 'active').length;
  const completedTodos = todos.filter(todo => todo.status === 'completed').length;

  const filters: { label: string; value: Filter; count: number }[] = [
    { label: 'All', value: 'all', count: totalTodos },
    { label: 'Active', value: 'active', count: activeTodos },
    { label: 'Completed', value: 'completed', count: completedTodos },
  ];

  return (
    <div className="flex gap-4 mb-8">
      {filters.map(({ label, value, count }) => (
        <button
          key={value}
          onClick={() => setFilter(value)}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            filter === value
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {label}
          <span className={`px-2 py-0.5 rounded-full text-sm ${
            filter === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-600'
          }`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}