import { useState, useEffect } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [categories, setCategories] = useState([]);
  const [inputCategory, setInputCategory] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [inputContent, setInputContent] = useState('');
  // const [editIndex, setEditIndex] = useState(null);
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedCategories && storedCategories.length) {
      setCategories(storedCategories);
    }
  }, [setCategories]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  const addCategory = () => {
    if (inputCategory.trim() !== '') {
      setCategories([...categories, { name: inputCategory, todos: [] }]);
      setInputCategory('');
    }
  };

  const removeCategory = (categoryIndex) => {
    const newCategories = [...categories];
    newCategories.splice(categoryIndex, 1);
    setCategories(newCategories);
  };

  const addTodo = (categoryIndex) => {
    if (inputTitle.trim() !== '' && inputContent.trim() !== '') {
      const newCategories = [...categories];
      newCategories[categoryIndex].todos.push({ title: inputTitle, content: inputContent, completed: false });
      setCategories(newCategories);
      setInputTitle('');
      setInputContent('');
      setShowAddTodoForm(false);
    }
  };

  const removeTodo = (categoryIndex, todoIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].todos.splice(todoIndex, 1);
    setCategories(newCategories);
  };

  const toggleComplete = (categoryIndex, todoIndex) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].todos[todoIndex].completed = !newCategories[categoryIndex].todos[todoIndex].completed;
    setCategories(newCategories);
  };

  return (
    <>
    <div className="p-3">
      <h1 className="flex justify-center mt-5 text-3xl font-bold">Manage Your Tasks</h1>
      <div className="flex justify-center mt-7 items-center">
      <input
        className="h-12 p-3 w-1/2 rounded-l-xl outline-none"
        type="text"
        placeholder="Category"
        value={inputCategory}
        onChange={(e) => setInputCategory(e.target.value)}
      />
      <button
      className=" bg-black px-5 h-12 rounded-r-xl"
      onClick={addCategory}>Add Category</button>
      </div>
      <div className=" p-5 flex justify-center mt-10 m-auto gap-5 rounded-xl">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className=" flex justify-center items-center">
          <div className="">
          <div className="btn flex items-center justify-between px-5 py-1 bg-slate-500 w-96">
          <h2 className=" font-extrabold">Category: {category.name}</h2>
          <div className="btn-item w-28 flex justify-around">
          <button onClick={() => { setShowAddTodoForm(true); setSelectedCategoryIndex(categoryIndex); }}> <img src="src/assets/add.png" alt="#add" width='20px' /></button>
          <button onClick={() => removeCategory(categoryIndex)}> <img src="src/assets/remove.png" alt="#remove" width='25px' /></button>
          </div>
          </div>
          {showAddTodoForm && selectedCategoryIndex === categoryIndex && (
            <div className=" flex flex-col">
              <input
                className="px-3 outline-none text-[16px] font-bold"
                type="text"
                placeholder="Title"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
              />
              <input
                className="px-3 outline-none text-[16px] font-bold"
                type="text"
                placeholder="Enter todo"
                value={inputContent}
                onChange={(e) => setInputContent(e.target.value)}
              />
              <button className=" bg-black font-bold text-xl" onClick={() => addTodo(categoryIndex)}>Add Todo</button>
            </div>
          )}
          <ul className="flex flex-wrap bg-slate-800 p-5 rounded-b-2xl gap-5 justify-center w-96">
            {category.todos.map((todo, todoIndex) => (
              <li className=" bg-black rounded-3xl px-10 py-5 flex flex-col items-center" key={todoIndex} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <input
                  className="mb-4"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(categoryIndex, todoIndex)}
                />
                <h3 className="font-bold">{todo.title}</h3>
                <p className=" bg-white mb-4 border-b-2 w-full"></p>
                <p>{todo.content}</p>
                <button className="mt-4" onClick={() => removeTodo(categoryIndex, todoIndex)}> <img src="src/assets/remove.png" alt="#remove" width="25px" /></button>
              </li>
            ))}
          </ul>
          </div>
        </div>
      ))}
      </div>
    </div>
    </>
  );

  // const [todos, setTodos] = useState([]);
  // const [inputTitle, setInputTitle] = useState('');
  // const [inputContent, setInputContent] = useState('');
  // const [editIndex, setEditIndex] = useState(null);

  // // Load todo items from local storage when the component mounts
  // useEffect(() => {
  //   const storedTodos = JSON.parse(localStorage.getItem('todos'));
  //   if (storedTodos && storedTodos.length) {
  //     setTodos(storedTodos);
  //   }
  // }, [setTodos]);

  // // Store todo items in local storage whenever they change
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]);

  // const addTodo = () => {
  //   if (inputTitle.trim() !== '' && inputContent.trim() !== '') {
  //     if (editIndex === null) {
  //       setTodos([...todos, { title: inputTitle, content: inputContent, completed: false }]);
  //     } else {
  //       const newTodos = [...todos];
  //       newTodos[editIndex] = { title: inputTitle, content: inputContent, completed: false };
  //       setTodos(newTodos);
  //       setEditIndex(null);
  //     }
  //     setInputTitle('');
  //     setInputContent('');
  //   }
  // };

  // const removeTodo = (index) => {
  //   const newTodos = [...todos];
  //   newTodos.splice(index, 1);
  //   setTodos(newTodos);
  // };

  // const editTodo = (index) => {
  //   const todo = todos[index];
  //   setInputTitle(todo.title);
  //   setInputContent(todo.content);
  //   setEditIndex(index);
  // };

  // const toggleComplete = (index) => {
  //   const newTodos = [...todos];
  //   newTodos[index].completed = !newTodos[index].completed;
  //   setTodos(newTodos);
  // };

  // return (
  //     <>
  //     <div className=" main h-full flex flex-col p-5">
  //     <h1 className="flex justify-center text-4xl font-extrabold mb-5">Manage Your Todos</h1>
  //     <form className=" gap-3 flex flex-col items-center">
  //     <input
  //       className="w-1/2 h-12 rounded-2xl pl-5"
  //       type="text"
  //       placeholder="Title"
  //       value={inputTitle}
  //       onChange={(e) => setInputTitle(e.target.value)}
  //     />
  //     <input
  //       className="w-1/2 h-12 rounded-2xl pl-5"
  //       type="text"
  //       placeholder="Enter todo"
  //       value={inputContent}
  //       onChange={(e) => setInputContent(e.target.value)}
  //     />
  //     <button className=" text-white justify-center items-center gap-2 flex w-1/4 font-bold bg-slate-600 h-12 rounded-2xl" onClick={addTodo}>{editIndex !== null ? 'Edit' : 'Add'} 
  //      Task
  //     </button>
  //     </form>
  //     <ul className=" w-1/2 flex-wrap justify-center m-auto gap-12 mt-5 flex rounded-3xl p-6">
  //       {todos.map((todo, index) => (
  //         <li className=" rounded-2xl p-5 flex justify-center" key={index} style={{ textDecoration: todo.completed ? 'line-through' : 'none', background : todo.completed ? "#FFFFF0" : "#1d2123" , color: todo.completed ? "black": "white"}}>
  //           <div className=" flex flex-col justify-center items-center">
  //           <input
  //             type="checkbox"
  //             checked={todo.completed}
  //             onChange={() => toggleComplete(index)}
  //           />
  //           <h3 className=" font-bold mt-5 text-xl">{todo.title}</h3>
  //           <p className=" border-b-2 mt-2 bg-white h-1 w-full"></p>
  //           <p className="mt-5">{todo.content}</p>
  //           <div className=" w-48 justify-around mt-5 flex gap-5">
  //           <button className="p-1 rounded-2xl" onClick={() => editTodo(index)}>
  //             <img className="" src="src/assets/edit.png" alt="#edit" width="22px"/>
  //           </button>
  //           <button className=" p-1 rounded-2xl" onClick={() => removeTodo(index)}>
  //             <img className="rounded-2xl" src="src/assets/remove.png" alt="#remove" width='25px' />
  //           </button>
  //           </div>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  //   </>
  // );
}

export default App;
