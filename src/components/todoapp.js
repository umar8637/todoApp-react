import React, { useState } from "react";
import "./Todo.css";

const Todo = () => {
  const [text, setText] = useState("");
  const [array, setArray] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editText, setEditText] = useState("");

  const handleArray = () => {
    if (!text) {
      return;
    } else {
      setArray([...array, { text, completed: false }]);
      setText("");
    }
  };

  const handleDelete = (index) => {
    const filteredArray = array.filter((item, indx) => {
      return index !== indx;
    });
    setArray(filteredArray);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(array[index].text);
  };

  const handleSave = (index) => {
    if (editText.trim() !== "") {
      const updatedArray = [...array];
      updatedArray[index].text = editText;
      setArray(updatedArray);
      setEditIndex(-1);
      setEditText("");
    }
  };

  const handleCancel = () => {
    setEditIndex(-1);
    setEditText("");
  };

  const handleToggleCompletion = (index) => {
    const updatedArray = array.map((item, indx) => {
      if (index === indx) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setArray(updatedArray);
  };

  return (
    <div className="todo-container">
      <h2>Todo App</h2>
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={handleArray}>Add Task</button>
      </div>

      <ul className="task-list">
        {array.map((item, index) => {
          return (
            <li key={index} className="task-item">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="icon-container">
                    <button onClick={() => handleSave(index)}>Save</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleToggleCompletion(index)}
                  />

                  {item.text}
                  <div className="icon-container">
                    <i
                      className="fa fa-pencil"
                      aria-hidden="true"
                      onClick={() => handleEdit(index)}
                    ></i>
                    <i
                      className="fa fa-trash-o"
                      aria-hidden="true"
                      onClick={() => handleDelete(index)}
                    ></i>
                  </div>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;
