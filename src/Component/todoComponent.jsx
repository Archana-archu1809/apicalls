import React,{useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {Card,Button, Modal,Input,Form} from "antd"

import { getTodo } from "../redux/actions/todo"
import {postTodo} from "../redux/actions/post"
import { connect } from "react-redux"
import { del, deleteTodo } from "../redux/actions/del"

function Todo(props){
    const [visible, setVisible] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
   const [description, setDescrpition] = useState([]);
    const dispatch=useDispatch()
   
    const todo=useSelector((state)=>state.todo.todo)
     const loading=useSelector((state)=>state.todo.loading)
      const error=useSelector((state)=>state.todo.error)
     
    useEffect(()=>{
        dispatch(getTodo())
      
       
    },[])
 
    const showModal=()=>{
         setVisible(true);
    }
    const onOk=()=>{
         const data={description:description}
        
   props.postApi(data)
          setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
     setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
   
    }
    const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
 const deletetodo=(todo)=>{
    props.deleteSaga(todo._id)
  }
    return(<div>
   {todo.loading && <p>loading...</p>}
  {todo.length > 0 &&
   todo.map((todo)=>(<Card key={todo._id}><h3>{todo.description}</h3>
   <Button onClick={()=>{deletetodo(todo)}}>Delete</Button>
   </Card>))}
 
    {todo.length === 0 && !loading && <p>No Todollist</p>}
    {error && !loading && <p>{error}</p>}
    <Button type="primary" onClick={showModal}>Add</Button>
    <Modal 
     title="Title"
    visible={visible}
    onOk={onOk}
      confirmLoading={confirmLoading}
        onCancel={handleCancel}>
            <Input
          placeholder="Add a description"
          value={description}
          onChange={(event) => setDescrpition(event.target.value)}
        />
        <p>{modalText}</p>
        </Modal>
      
     

    </div>)
}
const mapStateToProps=(state)=>{
  return{
      todo:state.postTodo.todo
  }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        postApi:(data)=>{
            dispatch(postTodo(data))
        },
        deleteSaga:(_id)=>{
           dispatch(deleteTodo(_id))
        }

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Todo)
