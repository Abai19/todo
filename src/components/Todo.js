import styles from './Todo.module.css'

function Todo({todo, editContent,setEditContent, deleteTodo, checkTodo, editTodo}) {
  return (
    <div className={styles.singleTodo}>
              <div className='d-flex justify-content-between align-items-center p-2'>
                    <input 
                        className="form-check-input"  
                        checked={todo.completed} 
                        type="checkbox" 
                        onChange={()=> checkTodo(todo.id, todo.completed)}
                    />
                    {
                      editContent.id === todo.id  ? 
                            <input type="text" 
                              value={editContent.title} 
                              onChange={(e)=> setEditContent({...editContent, title: e.target.value})}
                            /> 
                              :
                            <p className={todo.completed ? styles.completed : ''}>{todo.title}</p> 
                    }
                   <div>
                    {
                      editContent.id=== todo.id   ?
                      <button className="btn btn-success me-2" 
                             onClick={()=> editTodo(editContent)}>
                          save
                         </button>
                          :
                          <button className="btn btn-success me-2" 
                               onClick={()=> setEditContent({id: todo.id, title: todo.title})} > 
                            edit
                          </button>
                    }
                      {/* <button className="btn btn-success me-2" onClick={()=> setEditContent({id: todo.id, title: todo.title})} > edit</button> */}
                      <button className="btn btn-danger" onClick={()=> deleteTodo(todo.id)}> del</button>
                    </div>
              </div>
    </div>
  );
}

export default Todo;
