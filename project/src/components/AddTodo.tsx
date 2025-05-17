import React, { useState } from 'react';
import { Plus, Clock } from 'lucide-react';
import { useTodoStore } from '../store';
import { Priority, Category } from '../types';
import toast from 'react-hot-toast';

export function AddTodo() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('personal');
  const [priority, setPriority] = useState<Priority>('easy');
  const [dueDate, setDueDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');

  const addTodo = useTodoStore((state) => state.addTodo);

  const scheduleNotification = (title: string, scheduledTime: string) => {
    const scheduleTime = new Date(scheduledTime).getTime();
    const now = new Date().getTime();
    const delay = scheduleTime - now;
    
    if (delay > 0) {
      setTimeout(() => {
        // Play notification sound
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.play();

        // Show browser notification
        new Notification('Todo Reminder', {
          body: title,
          icon: '/vite.svg'
        });

        // Show toast notification
        toast.custom((t) => (
          <div className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
            <div className="flex-1 w-0 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <Clock className="h-10 w-10 text-blue-500" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Scheduled Task Reminder
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {title}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        ), {
          duration: 5000,
          position: 'top-center',
        });
      }, delay);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    addTodo({
      title,
      description,
      category,
      priority,
      dueDate,
      scheduledTime,
    });

    if (scheduledTime) {
      scheduleNotification(title, scheduledTime);
    }

    setIsOpen(false);
    setTitle('');
    setDescription('');
    setCategory('personal');
    setPriority('easy');
    setDueDate('');
    setScheduledTime('');
    toast.success('Todo added successfully!');
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Add New Task
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="birthday">Birthday</option>
                <option value="event">Event</option>
              </select>
              
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Schedule Time
                  <span className="ml-1 text-xs text-blue-600">(Will send reminder)</span>
                </label>
                <input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}