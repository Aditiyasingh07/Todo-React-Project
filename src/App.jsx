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
    <div className="opt"></div>
    <div className="optone"></div>
    <div className="p-3 main ">
      <h1 className="flex justify-center mt-5 text-3xl font-bold">Manage Your Tasks</h1>
      <div className="flex justify-center mt-7 items-center">
      <input
        className="h-12 p-3 w-1/2 rounded-l-xl bg-[#353935] outline-none"
        type="text"
        placeholder="Category"
        value={inputCategory}
        onChange={(e) => setInputCategory(e.target.value)}
      />
      <button
      className=" bg-[#FFBC40] text-slate-900 font-extrabold px-5 h-12 rounded-r-xl"
      onClick={addCategory}>Add Category</button>
      </div>
      <div className=" p-5 flex flex-wrap justify-center mt-10 m-auto gap-5 rounded-xl">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className=" flex justify-center items-center">
          <div className="">
          <div className="btn flex items-center justify-between px-5 py-1 bg-slate-600 w-96">
          <h2 className=" font-extrabold">Category: {category.name}</h2>
          <div className=" items-center btn-item w-32 flex justify-around">
          <button className=" bg-slate-100 rounded-md addbtn" onClick={() => { setShowAddTodoForm(true); setSelectedCategoryIndex(categoryIndex); }}></button>
          <button className="removebtn bg-slate-100 rounded-md " onClick={() => removeCategory(categoryIndex)}></button>
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
              <li className=" bg-[#6F8FAF] rounded-3xl px-10 py-5 flex flex-col items-center" key={todoIndex} style={{ textDecoration: todo.completed ? 'line-through' : 'none', background: todo.completed ? "#C0C0C0" : "#6F8FAF" ,
              color : todo.completed ? "black" : "none"
               }}>
                <input
                  className="mb-4"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(categoryIndex, todoIndex)}
                />
                <h3 className="font-bold">{todo.title}</h3>
                <p className=" bg-white mb-4 border-b-2 w-full"></p>
                <p>{todo.content}</p>
                <button className=" mt-4 todoremovebtn" onClick={() => removeTodo(categoryIndex, todoIndex)}></button>
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
}

export default App;
