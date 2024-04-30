import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {

 const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  // Load todo items from local storage when the component mounts
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos && storedTodos.length) {
      setTodos(storedTodos);
    }
  }, [setTodos]);

  // Store todo items in local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputTitle.trim() !== '' && inputContent.trim() !== '') {
      if (editIndex === null) {
        setTodos([...todos, { title: inputTitle, content: inputContent, completed: false }]);
      } else {
        const newTodos = [...todos];
        newTodos[editIndex] = { title: inputTitle, content: inputContent, completed: false };
        setTodos(newTodos);
        setEditIndex(null);
      }
      setInputTitle('');
      setInputContent('');
    }
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const editTodo = (index) => {
    const todo = todos[index];
    setInputTitle(todo.title);
    setInputContent(todo.content);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
      <>
      <div className=" main h-full flex flex-col p-5">
      <h1 className="flex justify-center text-4xl font-extrabold mb-5">Manage Your Todos</h1>
      <form className=" gap-3 flex flex-col items-center">
      <input
        className="w-1/2 h-12 rounded-2xl pl-5"
        type="text"
        placeholder="Title"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
      />
      <input
        className="w-1/2 h-12 rounded-2xl pl-5"
        type="text"
        placeholder="Enter todo"
        value={inputContent}
        onChange={(e) => setInputContent(e.target.value)}
      />
      <button className=" text-white justify-center items-center gap-2 flex w-1/4 font-bold bg-slate-600 h-12 rounded-2xl" onClick={addTodo}>{editIndex !== null ? 'Edit' : 'Add'} 
      <img className=" rounded-xl" src="src\assets\icon\add.gif" alt="" width="40px" />
      </button>
      </form>
      <ul className=" w-1/2 flex-wrap justify-center m-auto gap-12 mt-5 flex rounded-3xl p-6">
        {todos.map((todo, index) => (
          <li className=" rounded-2xl p-5 flex justify-center" key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none', background : todo.completed ? "#FFFFF0" : "#1d2123" , color: todo.completed ? "black": "white"}}>
            <div className=" flex flex-col justify-center items-center">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(index)}
            />
            <h3 className=" font-bold mt-5 text-xl">{todo.title}</h3>
            <p className=" border-b-2 mt-2 bg-white h-1 w-full"></p>
            <p className="mt-5">{todo.content}</p>
            <div className="mt-5 flex gap-5">
            <button className="p-1 rounded-2xl" onClick={() => editTodo(index)}>
              <img className=" rounded-3xl" src="src\assets\icon\edit.gif" alt="" width="40px"/>
            </button>
            <button className=" p-1 rounded-2xl" onClick={() => removeTodo(index)}>
              <img className="rounded-2xl" src="src\assets\icon\remove.gif" alt="" width='40px' />
            </button>
            </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default App;
