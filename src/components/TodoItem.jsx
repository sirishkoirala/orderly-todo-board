
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckIcon, Trash2Icon, EditIcon, MoveIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const priorityClasses = {
  high: "border-l-4 border-red-500",
  medium: "border-l-4 border-amber-500",
  low: "border-l-4 border-blue-500"
};

const priorityBadges = {
  high: "bg-red-900/50 text-red-200",
  medium: "bg-amber-900/50 text-amber-200",
  low: "bg-blue-900/50 text-blue-200"
};

const TodoItem = ({ todo, toggleComplete, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleEditSave = () => {
    if (editedTitle.trim()) {
      updateTodo(todo.id, { 
        title: editedTitle.trim(),
        priority: editedPriority
      });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
  };

  const priorityStyles = {
    low: "bg-blue-600 hover:bg-blue-700 text-white",
    medium: "bg-amber-600 hover:bg-amber-700 text-white",
    high: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <div className={`bg-gray-800 border border-gray-700 rounded-lg p-4 flex items-center gap-3 ${priorityClasses[todo.priority]} transition-all hover:shadow`}>
      <div className="mr-2 cursor-move text-gray-500">
        <MoveIcon size={18} />
      </div>
      <Checkbox 
        checked={todo.completed}
        onCheckedChange={() => toggleComplete(todo.id)}
        className="mr-2 border-gray-600"
      />
      
      <div className="flex-1">
        <div className={`font-medium ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
          {todo.title}
        </div>
        <div className="flex items-center mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${priorityBadges[todo.priority]}`}>
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
          </span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsEditing(true)} 
          className="text-gray-400 hover:text-gray-200 bg-gray-700 border-gray-600"
        >
          <EditIcon size={16} />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-400 hover:text-red-400 bg-gray-700 border-gray-600"
        >
          <Trash2Icon size={16} />
        </Button>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-gray-800 text-gray-200 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-200">Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Task Title</label>
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Priority</label>
              <div className="grid grid-cols-3 gap-2">
                <Button 
                  type="button"
                  onClick={() => setEditedPriority('low')}
                  variant={editedPriority === 'low' ? 'default' : 'outline'}
                  className={`${editedPriority === 'low' ? priorityStyles.low : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
                >
                  Low
                </Button>
                <Button 
                  type="button"
                  onClick={() => setEditedPriority('medium')}
                  variant={editedPriority === 'medium' ? 'default' : 'outline'}
                  className={`${editedPriority === 'medium' ? priorityStyles.medium : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
                >
                  Medium
                </Button>
                <Button 
                  type="button"
                  onClick={() => setEditedPriority('high')}
                  variant={editedPriority === 'high' ? 'default' : 'outline'}
                  className={`${editedPriority === 'high' ? priorityStyles.high : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'}`}
                >
                  High
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleEditSave}
              className="bg-purple-700 hover:bg-purple-800 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoItem;
