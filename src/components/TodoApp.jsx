
import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoFilters from './TodoFilters';
import { useToast } from "@/components/ui/use-toast";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (error) {
        console.error('Failed to parse todos from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
    toast({
      title: "Todo added",
      description: "Your new task has been added",
    });
  };

  const updateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updatedTodo } : todo));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Todo deleted",
      description: "The task has been removed",
    });
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const updated = { ...todo, completed: !todo.completed };
        return updated;
      }
      return todo;
    }));
  };

  const updateTodoOrder = (reorderedTodos) => {
    setTodos(reorderedTodos);
    localStorage.setItem('todos', JSON.stringify(reorderedTodos));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all' filter
  });

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
          <h1 className="text-3xl font-bold text-white">Todo App</h1>
          <p className="text-indigo-100 mt-1">Organize your tasks efficiently</p>
        </div>
        
        <div className="p-6">
          <TodoForm addTodo={addTodo} />
          <TodoFilters filter={filter} setFilter={setFilter} />
          <TodoList 
            todos={filteredTodos} 
            toggleComplete={toggleComplete}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            updateTodoOrder={updateTodoOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
