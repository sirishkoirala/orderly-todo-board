
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckIcon, Trash2Icon, EditIcon, MoveIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const priorityClasses = {
  high: "border-l-4 border-red-500",
  medium: "border-l-4 border-yellow-500",
  low: "border-l-4 border-blue-500"
};

const priorityBadges = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-blue-100 text-blue-800"
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

  return (
    <div className={`bg-white border rounded-lg p-4 flex items-center gap-3 ${priorityClasses[todo.priority]} transition-all hover:shadow`}>
      <div className="mr-2 cursor-move text-gray-400">
        <MoveIcon size={18} />
      </div>
      <Checkbox 
        checked={todo.completed}
        onCheckedChange={() => toggleComplete(todo.id)}
        className="mr-2"
      />
      
      <div className="flex-1">
        <div className={`font-medium ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
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
          className="text-gray-500 hover:text-gray-700"
        >
          <EditIcon size={16} />
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => deleteTodo(todo.id)}
          className="text-gray-500 hover:text-red-600"
        >
          <Trash2Icon size={16} />
        </Button>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Task Title</label>
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <div className="flex gap-2">
                <Button 
                  type="button"
                  onClick={() => setEditedPriority('low')}
                  variant={editedPriority === 'low' ? 'default' : 'outline'}
                  className={`flex-1 ${editedPriority === 'low' ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                >
                  Low
                </Button>
                <Button 
                  type="button"
                  onClick={() => setEditedPriority('medium')}
                  variant={editedPriority === 'medium' ? 'default' : 'outline'}
                  className={`flex-1 ${editedPriority === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                >
                  Medium
                </Button>
                <Button 
                  type="button"
                  onClick={() => setEditedPriority('high')}
                  variant={editedPriority === 'high' ? 'default' : 'outline'}
                  className={`flex-1 ${editedPriority === 'high' ? 'bg-red-500 hover:bg-red-600' : ''}`}
                >
                  High
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoItem;
