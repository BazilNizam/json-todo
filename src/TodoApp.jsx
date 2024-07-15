import React, { useEffect, useState } from "react";
import axios from 'axios';
import TodoList from './TodoList';
import TodoForm from './TodoForm';


const TodoApp = () => {

    const [todos, setTodos] = useState([]);

    useEffect(() => {
      fetchTodos();
    }, []);

    const fetchTodos = () => {
      axios.get('http://localhost:5000/todos')
        .then(response => {
          setTodos(response.data);
        })
        .catch(error => {
          console.error('Error fetching todos:', error);
        });
    };


    const addTodo = (newTodo) => {
      axios.post('http://localhost:5000/todos', { title: newTodo })
        .then(response => {
          setTodos([...todos, response.data]);
        })
        .catch(error => {
          console.error('Error adding todo:', error);
        });
    };

    const deleteTodo = (id) => {
      axios.delete(`http://localhost:5000/todos/${id}`)
        .then(response => {
          const updatedTodos = todos.filter(todo => todo.id !== id);
          setTodos(updatedTodos);
        })
        .catch(error => {
          console.error('Error deleting todo:', error);
        });
    };

    const editTodo = (editedTodo) => {
      axios.put(`http://localhost:5000/todos/${editedTodo.id}`, editedTodo)
        .then(response => {
          const updatedTodos = todos.map(todo =>
            todo.id === editedTodo.id ? { ...todo, title: editedTodo.title } : todo
          );
          setTodos(updatedTodos);
        })
        .catch(error => {
          console.error('Error editing todo:', error);
        });
    };

    

  return (
    <div>
      <h1>TodoApp</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onEdit={editTodo}/>
    </div>
  );
};

export default TodoApp;
