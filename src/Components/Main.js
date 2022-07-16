import React, { useEffect, useState, useId } from "react";
import "./Main.css";

function Main() {
  const url = "https://jsonplaceholder.typicode.com/users/1/todos";
  const [index, setIndex] = useState(null);
  const [todo, setTodo] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [checked, setChecked] = useState([]);

  //Fetching initial Todo's
  const initialTodos = async () => {
    try {
      const search = await fetch(url);
      const searchData = await search.json();
      setIndex(searchData.length + 1);
      setTodo(searchData);
    } catch (error) {
      console.log(error);
    }
  };

  //Adding new Todo's
  const addTodo = (newTodo) => {
    let newTitle = { title: newTodo, id: index };
    setTodo((todo) => [...todo, newTitle]);
    let b = index + 1;
    setIndex(b);
    setNewTodo("");
  };

  //Deleting Todo's
  const deleteTodo = (id) => {
    setChecked(filterTodos(checked, id));
    console.log(todo);
    setTodo(filterTodos(todo, id, true));
    // setTodo(todo.filter((value) => value.id !== id));
    console.log(todo);
  };

  //Checking if todo is checked or not if checked then remove else add it
  const handleCheck = (id) => {
    console.log(id, checked);
    if (isChecked(id)) {
      setChecked(filterTodos(checked, id));
      return;
    }
    setChecked((checked) => [...checked, id]);
  };

  //returning if todo is checked or not (true/ false)
  const isChecked = (id) => {
    return checked.includes(id);
  };

  //receiving array and returning new array after removing todo

  const filterTodos = (arr, id, hasChild = false) => {
    //if child is true then data is fetched from the object using key else from array using value
    if (hasChild) {
      console.log(arr);
      return arr.filter((value) => value.id !== id);
    }
    console.log(arr);
    return arr.filter((value) => value !== id);
  };

  useEffect(() => {
    initialTodos();
  }, []);

  return (
    <div className="todoList">
      {todo.length ? (
        todo.map((todo) => {
          return (
            <>
              <div className="todo_container">
                <input
                  type="checkbox"
                  value={todo.id}
                  onChange={() => handleCheck(todo.id)}
                  checked={isChecked(todo.id)}
                ></input>
                <div
                  className={
                    isChecked(todo.id) ? "todo_title checked" : "todo_title"
                  }
                >
                  {todo.title}
                </div>
                <button onClick={() => deleteTodo(todo.id)}>delete</button>
              </div>
            </>
          );
        })
      ) : (
        <h5>Looks like you are absolutely free</h5>
      )}
      <div>
        <h1>Done: {checked.length}</h1>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        ></input>
        <button type="submit" onClick={() => addTodo(newTodo)}>
          submit
        </button>
      </div>
    </div>
  );
}

export default Main;
