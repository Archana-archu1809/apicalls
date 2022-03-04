import React,{useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {Card,Button, Modal,Input} from "antd"

import { getTodo } from "../redux/actions/todo"
import {posttodo} from "../redux/actions/post"
import { connect } from "react-redux"

function Todo(props){
    const [visible, setVisible] = useState(false);
     const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
   const [description, setDescrpition] = useState("");
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
         console.log(data)
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
    return(<div>
   {todo.loading && <p>loading...</p>}
  {todo.length > 0 &&
   todo.map((todo)=>(<Card key={todo._id}><h3>{todo.description}</h3></Card>))}
 
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
      todo:state.todo
  }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        postApi:(data)=>{
            dispatch(posttodo(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Todo)
