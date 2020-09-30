import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  let localTodos = JSON.parse(localStorage.getItem('todos'));
  let localCompletedTodos = JSON.parse(localStorage.getItem('completedTodos'));

  if(!localTodos) localTodos = "";
  if(!localCompletedTodos) localCompletedTodos = "";

  const [todos, setTodos] = useState([...localTodos]);
  const [toUpdateTodo, setToUpdateTodo] = useState(false);
  const [updateWalaTodo, setUpdateWalaTodo] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([...localCompletedTodos]);

  useEffect(()=> {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  useEffect(() => {
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos))
  }, [completedTodos])

  function addTodo(a) {
    a.preventDefault();
    const newTodo = document.getElementById("todo");
    if (!newTodo.value) {
      return;
    }
    setTodos([...todos, {
      value: newTodo.value,
      time: getTimeNow()
    }]);
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
    const justUpdatedTodo = {
      value: updatedValue,
      time: getTimeNow()
    }
    const newTodos = todos.map((todo) => {
      return todo === updateWalaTodo ? (todo = justUpdatedTodo || updateWalaTodo) : todo;
    });
    console.log(newTodos)
    setTodos([...newTodos]);
    document.getElementById('todo').value = "";
    setToUpdateTodo(false);
    setUpdateWalaTodo("");
  }

  function setValue(todo) {
    document.getElementById("todo").value = todo.value;
    setUpdateWalaTodo(todo);
    console.log(todo)
  }

  function completeTodo(todo) {
    setCompletedTodos([todo, ...completedTodos])
    deleteTodo(todo);
  }

  function getTimeNow() {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = new Date();
    var day = days[d.getDay()];
    var hr = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    var month = months[d.getMonth()];
    var year = d.getFullYear();
    return `${hr}:${min}:${sec}${ampm}, ${day} (${month}, ${year})`
  }

  function deleteCompleted(todo) {
    const todoList = completedTodos.filter(item => item.value !== todo)
    setCompletedTodos([...todoList]);
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
          <i className="fa fa-wrench" aria-hidden="true"></i>
          : <i className="fa fa-plus" aria-hidden="true"></i>}
        </button>
      </form>
      <div className="todos">
        <div className="pending__todos">
            {todos.length > 0 && <h3 style={{ color: 'blue' }}>Pending</h3>}
            {todos &&
              todos.map((todo) => {
                return (
                  <div className="todo column__todo" key={todo}>
                  <div className="todo__details">
                    <pre>Created at {todo.time}</pre>
                    <span>{todo.value}</span>
                  </div>
                    <div className="buttons">
                      <button onClick={() => {completeTodo(todo)}}>
                        <i className="fa fa-check" aria-hidden="true"></i>
                      </button>
                      
                      { updateWalaTodo !== todo ?  
                      <button
                        onClick={() => {
                          setToUpdateTodo(true);
                          setValue(todo);
                        }}
                      >
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </button> 
                      : " " }

                      <button onClick={() => deleteTodo(todo)}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
              {todos.length === 0 && <div className="empty__message">
                <pre>No todos available at this moment.</pre>
                <h3>Create new todos.</h3>
              </div>}
        </div>
        <div className="completed__todos">
          {todos.length > 0 && <h3 style={{ color: 'green' }}>Completed</h3>}
            {completedTodos.map(todo => {
              return (
            <div className="todo" key={todo.time}>
              <div className="todo__details">
                <pre> Completed On {todo.time}</pre>
                <span>{todo.value}</span>
              </div>
              <div className="buttons">
                <button onClick={() => deleteCompleted(todo.value)}>
                  <i className="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          )})}
          {completedTodos.length === 0 && todos.length > 0 && <div className="empty__message">
                <pre>No data found.</pre>
              </div>} 
        </div>
      </div>
    </div>
  );
}

export default App;
