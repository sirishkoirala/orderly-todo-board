
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

  const priorityStyles = {
    low: "bg-blue-600 hover:bg-blue-700 text-white",
    medium: "bg-amber-600 hover:bg-amber-700 text-white",
    high: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div className="flex flex-col space-y-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-300 mb-1 block">Priority</label>
          <div className="grid grid-cols-3 gap-2">
            <Button 
              type="button"
              onClick={() => setPriority('low')}
              variant={priority === 'low' ? 'default' : 'outline'}
              className={`${priority === 'low' ? priorityStyles.low : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
            >
              Low
            </Button>
            <Button 
              type="button"
              onClick={() => setPriority('medium')}
              variant={priority === 'medium' ? 'default' : 'outline'}
              className={`${priority === 'medium' ? priorityStyles.medium : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
            >
              Medium
            </Button>
            <Button 
              type="button"
              onClick={() => setPriority('high')}
              variant={priority === 'high' ? 'default' : 'outline'}
              className={`${priority === 'high' ? priorityStyles.high : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
            >
              High
            </Button>
          </div>
        </div>
        <Button 
          type="submit" 
          className="bg-purple-700 hover:bg-purple-800 text-white"
        >
          Add Task
        </Button>
      </div>
    </form>
  );
};

export default TodoForm;
