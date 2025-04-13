
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const TodoForm = ({ addTodo }) => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    const newTodo = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };
    
    addTodo(newTodo);
    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
          <div className="flex gap-2">
            <Button 
              type="button"
              onClick={() => setPriority('low')}
              variant={priority === 'low' ? 'default' : 'outline'}
              className={`flex-1 ${priority === 'low' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
            >
              Low
            </Button>
            <Button 
              type="button"
              onClick={() => setPriority('medium')}
              variant={priority === 'medium' ? 'default' : 'outline'}
              className={`flex-1 ${priority === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
            >
              Medium
            </Button>
            <Button 
              type="button"
              onClick={() => setPriority('high')}
              variant={priority === 'high' ? 'default' : 'outline'}
              className={`flex-1 ${priority === 'high' ? 'bg-red-500 hover:bg-red-600' : ''}`}
            >
              High
            </Button>
          </div>
        </div>
        <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
