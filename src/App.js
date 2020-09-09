import React, {useState, useEffect} from 'react';
import './App.css';
import Snackbar from './components/snackbar'

function App() {
  const localTodos = JSON.parse(localStorage.getItem('todos'));

  const [todos, setTodos] = useState([...localTodos]);
  const [toUpdateTodo, setToUpdateTodo] = useState(false);
  const [updateWalaTodo, setUpdateWalaTodo] = useState([]);

  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(a) {
    a.preventDefault();
    const newTodo = document.getElementById("todo");
    if (!newTodo.value) {
      return;
    }
    setTodos([...todos, newTodo.value]);
    newTodo.value = "";
  }

  function deleteTodo(todo) {
    const todoList = [...todos];
    const index = todoList.indexOf(todo);
    todoList.splice(index, 1);
    setTodos([...todoList]);
  }

  function updateTodo(e) {
    e.preventDefault();
    const updatedValue = document.getElementById("todo").value;
    deleteTodo(updatedValue);
    const newTodos = todos.map((todo) => {
      return todo === updateWalaTodo ? (todo = updatedValue || updateWalaTodo) : todo;
    });
    setTodos([...newTodos]);
    document.getElementById('todo').value = "";
    setToUpdateTodo(false);
    setUpdateWalaTodo("");
  }

  function setValue(todo) {
    document.getElementById("todo").value = todo;
    setUpdateWalaTodo(todo);
  }

  return (
    <div className="App">
      <div className="heading">
        <h2>Todos App</h2>
        <p>Create, update & delete todos.</p>
      </div>
      <form onSubmit={toUpdateTodo ? updateTodo : addTodo}>
        <input className="input" id="todo" placeholder="Create todo" />
        <button type="submit">
          {toUpdateTodo ? 
          <i class="fa fa-wrench" aria-hidden="true"></i>
          : <i class="fa fa-plus" aria-hidden="true"></i>}
        </button>
      </form>
      {todos &&
        todos.map((todo) => {
          return (
            <div className="todo" key={todo}>
              <span>{todo}</span>
              <div className="buttons">
                { updateWalaTodo !== todo ?  
                <button
                  onClick={() => {
                    setToUpdateTodo(true);
                    setValue(todo);
                  }}
                >
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </button> : " " }
                <button onClick={() => deleteTodo(todo)}>
                <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default App;
