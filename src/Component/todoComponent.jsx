import React,{useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {Card} from "antd"

import { getTodo } from "../redux/actions/todo"
const Todo=()=>{
    const dispatch=useDispatch()
    const todo=useSelector(state=>state.todo.todo)
     const loading=useSelector(state=>state.todo.loading)
      const error=useSelector(state=>state.todo.error)
    useEffect(()=>{
        dispatch(getTodo())
    },[])
    return(<div>
   
    {todo.length > 0 && todo.map((todo)=>(
      
        <Card key={todo._id}>
         
            <h3>{todo.description}</h3>
         
        </Card>
          
    ))}
    {todo.length===0 && !loading && <p>No Todollist</p>}
    {error && !loading && <p>{error}</p>}
    </div>)
}
export default Todo