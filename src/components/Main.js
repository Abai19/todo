import Todo from "./Todo";
import styles from './Main.module.css'
import { useEffect, useState } from "react";
import Loader from "./Loader";
function Main() {
    const [todos, setTodos] = useState([]);
    const [val, setVal] = useState('');
    const [editContent, setEditContent] = useState({
        id: 0,
        title: ""
    })
    useEffect(()=> {
        getTodos();
    }, [])
    function getTodos(){
        fetch("http://localhost:3000/todo")
            .then(response=> response.json())
            .then(data=>    setTodos(data))
    }
    function addTodo (){
        let options= {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            method: "POST",
            body: JSON.stringify({title: val, completed:false})
        }
        fetch("http://localhost:3000/todo", options)
            .then(response=> response.json())
            .then(data=> {   
                if(data){
                    getTodos()
                    setVal("")
                }
            })
    }
    function deleteTodo(id){
        let options = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            method: "DELETE",
        }
        fetch(`http://localhost:3000/todo/${id}`, options)
        .then(response=> response.json())
         .then(data=> {   
            if(data){
                getTodos()
            }
        })
    }

    function checkTodo (id, completed){
        let options= {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            method: "PATCH",
            body: JSON.stringify({completed: !completed})
        }
        fetch(`http://localhost:3000/todo/${id}`, options)
            .then(response=> response.json())
            .then(data=> {   
                if(data){
                    getTodos()
                }
            })
    }

    function editTodo (editContent){
        
        let options= {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            method: "PATCH",
            body: JSON.stringify({title: editContent.title})
        }
        fetch(`http://localhost:3000/todo/${editContent.id}`, options)
            .then(response=> response.json())
            .then(data=> {   
                if(data){
                    setEditContent({id: 0, title: ''}); 
                    getTodos();
                }
            })
    }
  return (
    <div className={styles.container}>
        <h1 className="mt-2">ToDo app</h1>
        <div className="input-group">
            <input type="text" className="form-control" value={val} onChange={(e)=> setVal(e.target.value)}/>
            <button className="btn btn-primary" onClick={addTodo}>add</button>
        </div>
    
            {
                todos.length>0  ? todos.map((todo,index)=> (
                    <Todo key={index} 
                        todo={todo} 
                        deleteTodo={deleteTodo} 
                        checkTodo={checkTodo} 
                        editTodo={editTodo} 
                        editContent= {editContent}
                        setEditContent={setEditContent}
                    />
                ))
                :
                <Loader/>
            }
            {/* <Todo/> */}

        
    </div>
  );
}

export default Main;
