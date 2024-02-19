import { useState } from 'react'
import './App.css'

function App() {
  const [toDos,setToDos]=useState([])
  const [toDo,setToDo]=useState('')

  const handleTOdochange =(event)=>setToDo(event.target.value)
  
  const handleAddtodo=()=>{
    if(toDo.trim()!== ''){
      setToDos([...toDos,{id:Date.now(), text:toDo,status:false}]);
      setToDo('');
    }else{
      alert('Please add text')
    }
  }

  const handleCheckboxChange = (id, checked) => {
    setToDos(toDos.map(todo => 
      todo.id === id ? { ...todo, status: checked } : todo
    ));
  };

  const toDoDelete=(obj)=>{
    setToDos(toDos.filter((obj2)=>{
      return obj2.id !== obj.id
    }))
  }

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's My planes</h2>
      </div>
      <div className="input">
        <input value={toDo} onChange={handleTOdochange} type="text" placeholder=" Add item..." />
        <i onClick={handleAddtodo} className="fas fa-plus"></i>
      </div>

      <div className="todos">
        {toDos.map((obj)=>{
          return(
          <div className="todo">
          <div className="left">
              <input
                onChange={(e) => handleCheckboxChange(obj.id, e.target.checked)}
                checked={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>

          <div className="right">
            <i onClick={()=>toDoDelete(obj)} className="fas fa-times"></i>
          </div>

        </div>)
          })
          }
          </div>
    </div>
  )
}

export default App
