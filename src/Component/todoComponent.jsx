import React,{useState,useEffect} from "react"
import {useSelector,useDispatch} from "react-redux"
import {Button, Modal,Input,Switch,Table,Popconfirm,message} from "antd"
import{ExclamationCircleOutlined} from "@ant-design/icons"

import { getTodo } from "../redux/actions/todo"
import {postTodo} from "../redux/actions/post"
import { connect } from "react-redux"
import {  deleteTodo } from "../redux/actions/del"
import { updateTodo } from "../redux/actions/update"
const{confirm}=Modal


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

  
 const deletetodo=(record)=>{
   
    props.deleteSaga(record.id)
  }
  const onupdate=(todo,checked)=>{
  
  
 props.updateSaga(todo.id,checked)
 
  }
  function showDelete(record) {
    console.log(record)
    props.deleteSaga(record.id)
  confirm({
    title: 'Are you sure delete this task?',
    icon: <ExclamationCircleOutlined />,
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

 
  const data=todo.map((row)=>({
    Description:row.description,
    id:row._id
  }))

 const columns=[
   {title:"Description",
  dataIndex:"Description",
  key:"Description",
   width: 150,
   align: "center",
  },
   {title:"Edit",
  dataIndex:"Edit",
  key:"Edit",
   width: 150,
   align: "center",
   render:(Edit,record,index)=>{
     return(
       <Switch onChange={(checked)=>onupdate(record,checked)}
       
       />
     )
   }
  },
   {title:"Delete",
  dataIndex:"Delete",
  key:"Delete",
   width: 150,
   align: "center",
   render:(Delete,record,index)=>{
     return(
   
    
   
    <Button onClick={()=>showDelete(record)}>Delete</Button>
      
     )
   }
  },

 ]
    return(<div>
      <h3>TodoList</h3>
   {todo.loading && <p>loading...</p>}
  {todo.length > 0 &&
    <Table dataSource={data} columns={columns} />
  }
   
    {todo.length === 0 && !loading && <p>No Todollist</p>}
    {error && !loading && <p>{error}</p>}
    <Button type="primary" onClick={showModal}>Add Description</Button>
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
      
     
         
    </div>
   )
}
const mapStateToProps=(state)=>{
  return{
      todo:state.postTodo.todo,
      
  }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        postApi:(data)=>{
            dispatch(postTodo(data))
        },
        deleteSaga:(id)=>{
           dispatch(deleteTodo(id))
        },
        updateSaga:(id,checked)=>{
          dispatch(updateTodo(id,checked))
        }


    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Todo)
