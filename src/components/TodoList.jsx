
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

const TodoList = ({ todos, toggleComplete, updateTodo, deleteTodo, updateTodoOrder }) => {
  // Initialize state with the todos prop
  const [todoItems, setTodoItems] = useState(todos);

  // Update local state when the todos prop changes
  useEffect(() => {
    setTodoItems(todos);
  }, [todos]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todoItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTodoItems(items);
    updateTodoOrder(items);
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks found. Add a task to get started!</p>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            className="space-y-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todoItems.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`transition-shadow ${snapshot.isDragging ? 'shadow-lg' : ''}`}
                  >
                    <TodoItem
                      todo={todo}
                      toggleComplete={toggleComplete}
                      updateTodo={updateTodo}
                      deleteTodo={deleteTodo}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
