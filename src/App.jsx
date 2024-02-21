import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [toDos, setToDos] = useState([])
  const [toDo, setToDo] = useState('')
  const [editingTodo, setEdithingTodo] = useState(null)
  const [editingTodoText, setEdithingTodoText] = useState('')
  const refObj = useRef()

  useEffect(() => {
    refObj.current.focus()
  }, [])

  const handleTOdochange = (event) => setToDo(event.target.value)

  const handleAddtodo = () => {
    if (toDo.trim() !== '') {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo('');
    } else {
      alert('Please add text')
    }
  }

  const handleCheckboxChange = (id, checked) => {
    setToDos(toDos.map((obj) => {
      if (obj.id === id) {
        return { ...obj, status: checked };
      } else {
        return obj; 
    }
  }));
  };

  const toDoDelete = (obj) => {
    setToDos(toDos.filter((obj2) => {
      return obj2.id !== obj.id
    }))
  }

  const toTextEdit = (obj) => {
    setEdithingTodo(obj.id);
    setEdithingTodoText(obj.text)
  }

  const todoEditSave = () => {
    if (editingTodoText.trim() !== '') {
      setToDos(
        toDos.map((obj) => {
          if (obj.id === editingTodo) {
            obj.text = editingTodoText
          }
          return obj
        })
      )
      setEdithingTodo(null)
      setEdithingTodoText('')
    } else {
      alert('Please enter text')
    }
  }

  const todoEditCancel = () => {
    setEdithingTodo(null)
    setEdithingTodoText('')
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
        <input ref={refObj} value={toDo} onChange={handleTOdochange} type="text" placeholder=" Add item..." />
        <i onClick={handleAddtodo} className="fas fa-plus"></i>
      </div>

      <div className="todos">
        {
          toDos.map((obj) => {
            return (
              <div className="todo">
                <div className="left">
                  <input
                    onChange={(e) => handleCheckboxChange(obj.id, e.target.checked)}
                    checked={obj.status}
                    type="checkbox"
                    name=""
                    id=""
                  />
                  {editingTodo === obj.id ? (
                    <div>
                      <input onChange={(event) => setEdithingTodoText(event.target.value)} type="text" value={editingTodoText} />
                    </div>
                  ) : (
                    <p>{obj.text}</p>
                  )}
                </div>

                <div className="right">
                  {editingTodo === obj.id ? (
                    <>
                      <i onClick={todoEditSave} className="fas fa-save"></i>
                      <i onClick={todoEditCancel} className="fas fa-ban"></i>
                    </>
                  ) : (
                    <i onClick={() => toTextEdit(obj)} className="fas fa-edit"></i>
                  )}
                  <i onClick={() => toDoDelete(obj)} className="fas fa-times"></i>
                </div>

              </div>)
          })
        }
      </div>
    </div>
  )
}

export default App
