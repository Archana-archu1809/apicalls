import {
  Card,
  Button,
  Modal,
  Input,
  Switch,
  Table,
  Space,
  Row,
  Col,
} from "antd";
import { useEffect, useState } from "react";

function TodoGet() {
  const [loading, setLoading] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [description, setDescrpition] = useState("");

  useEffect(() => {
    const url = "https://api-nodejs-todolist.herokuapp.com/task";

    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("value")}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setTodoList(json.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const data = todoList.map((row) => ({
    Description: row.description,
    id: row._id,
    completed: row.completed,
  }));
  const columns = [
    {
      title: "Description",
      dataIndex: "Description",

      width: 150,
      align: "center",
    },
    {
      title: "Edit",
      dataIndex: "Edit",

      width: 150,
      align: "center",
      render: (text, record, index) => {
        return (
          <Switch
            onChange={(checked) => onUpdate(record.id, checked)}
            disabled={record.completed}
          />
        );
      },
    },
    {
      title: "Delete",
      dataIndex: "Delete",

      width: 150,
      align: "center",
      render: (Delete, record, index) => {
        return (
          <Button type="dashed" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        );
      },
    },
  ];
  function onUpdate(id, checked) {
    console.log(`switch to ${checked}`);
    const url = `https://api-nodejs-todolist.herokuapp.com/task/${id}`;
    let data = { completed: checked };
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("value")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }
  const onDelete = (id) => {
    const url = `https://api-nodejs-todolist.herokuapp.com/task/${id}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("value")}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const list = todoList.filter((json) => json.id !== id);
        setTodoList(list);
      });
  };
  function printTodo() {
    return todoList.map((user, index) => (
      <Card key={index}>
        <Space>
          <h3>{user.description}</h3>
          <Switch
            disabled={user.completed}
            onChange={(checked) => onUpdate(user._id, checked)}
          />
          <Button type="dashed" onClick={() => onDelete(user._id)}>
            Delete
          </Button>
        </Space>
      </Card>
    ));
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);

    console.log("sucess:", description);
    let data = { description: description };
    let url = "https://api-nodejs-todolist.herokuapp.com/task";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("value")}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Col>
          <h1>TodoList</h1>
        </Col>
      </Row>
      <Table dataSource={data} columns={columns} />
      <Button type="primary" onClick={showModal}>
        Add
      </Button>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Add a description"
          value={description}
          onChange={(event) => setDescrpition(event.target.value)}
        />
        <p>{modalText}</p>
      </Modal>
    </>
  );
}
export default TodoGet;
