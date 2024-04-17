import React, { useState } from "react";
import { FaRegTrashAlt, FaMarker } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex items-center`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
  buttonSpacing: `margin-right: 1cm`,
};

const Todo = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text); 

  const handleEditChange = (e) => {
    setEditedText(e.target.value); // Cập nhật giá trị của editedText khi người dùng thay đổi nội dung
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedText.trim() === "") {
      // Kiểm tra nếu nội dung chỉnh sửa rỗng, không thực hiện cập nhật
      alert("Nội dung không thể để trống!");
      return;
    }
    editTodo(todo.id, editedText); // Gọi hàm editTodo để lưu thay đổi
    setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa sau khi lưu
  };

  return (
    <li className={todo.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed ? "checked" : ""}
        />
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editedText}
              onChange={handleEditChange}
              autoFocus
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <p
            onClick={() => setIsEditing(true)}
            className={todo.completed ? style.textComplete : style.text}
          >
            {todo.text}
          </p>
        )}
      </div>
      <div className={style.row}>
        <button
          onClick={() => deleteTodo(todo.id)}
          className={`${style.button} ${style.buttonSpacing}`}
        >
          <FaRegTrashAlt />
        </button>
        <button onClick={() => setIsEditing(true)} className={style.button}>
          <FaMarker />
        </button>
      </div>
    </li>
  );
};

export default Todo;
