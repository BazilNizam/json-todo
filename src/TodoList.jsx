import React from "react";
import { useState } from "react";

const TodoList = ({ todos, onDelete, onEdit }) => {
  const [editedTodo, setEditedTodo] = useState({ id: null, title: '' });

  const handleEditInputChange = (event) => {
    setEditedTodo({
      ...editedTodo,
      title: event.target.value
    });
  };

  const handleEditSubmit = () => {
    onEdit(editedTodo);
    setEditedTodo({ id: null, title: '' });
  };

  const handleEditCancel = () => {
    setEditedTodo({ id: null, title: '' });
  };

  const handleEditClick = (todo) => {
    setEditedTodo({ id: todo.id, title: todo.title });
  };

  const handleDelete = (id) => {
    onDelete(id);
  }


  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.id === editedTodo.id ? (
            <div>
              <input
                type="text"
                value={editedTodo.title}
                onChange={handleEditInputChange}
              />
              <button onClick={handleEditSubmit}>Update</button>
              <button onClick={handleEditCancel}>Cancel</button>
            </div>
          ) : (
            <div>
              {todo.title}
              <button onClick={() => handleDelete(todo.id)}>Delete</button>
              <button onClick={() => handleEditClick(todo)}>Edit</button>
            </div>
          )}
        
        
        </li>
        
      ))}
    </ul>
  );
};

export default TodoList;
