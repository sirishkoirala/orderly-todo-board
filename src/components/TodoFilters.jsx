
import { Button } from "@/components/ui/button";

const TodoFilters = ({ filter, setFilter }) => {
  return (
    <div className="flex items-center mb-6 justify-between">
      <div className="text-sm font-medium text-gray-500">Filter Tasks</div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          All
        </Button>
        <Button
          size="sm"
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          Active
        </Button>
        <Button
          size="sm"
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};

export default TodoFilters;
