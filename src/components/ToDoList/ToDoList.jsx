import { useEffect, useState } from 'react';
import './ToDoList.scss';
import AddTask from '../AddTask/AddTask';
import EditTask from '../EditTask/EditTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ToDoList() {
  const [todos, setToDos] = useState([]);
  const [checkedItem, setCheckedItem] = useState({});
  const [editedItems, setEditedItems] = useState(null);

  // fetch data from json file
  useEffect(() => {
    fetch('./list.json')
      .then((response) => response.json())
      .then((data) => setToDos(data.todos));
  }, []);

  // Add a new task to list
  const addToList = (text) => {
    const newItem = { id: Date.now(), text, completed: false };

    // Update the todos state with new item
    setToDos([...todos, newItem]);
  };

  // Edit item
  const saveEdit = (id, newText) => {
    const updatedItems = todos.map((item) =>
      item.id === id ? { ...item, text: newText } : item
    );
    setToDos(updatedItems);
    setEditedItems(null);
  };

  // Update checkItem based on checkbox state
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    setCheckedItem((prev) => ({
      ...prev,
      [value]: checked,
    }));
  };

  // Delete item
  const handleDelete = (id) => {
    setToDos(todos.filter((item) => item.id !== id));
  };

  return (
    <>
      <AddTask newTask={addToList} />
      <div className="list">
        <ul className="list-item">
          {todos.map((item) => (
            <li key={item.id}>
              {editedItems === item.id ? (
                <EditTask item={item} itemSave={saveEdit} />
              ) : (
                <>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="todo"
                      value={item.id}
                      onChange={handleCheck}
                      checked={!!checkedItem[item.id]}
                    />
                    <span className="checkmark">
                      <FontAwesomeIcon icon={faCheck} className="icon" />
                    </span>
                    <span
                      className={checkedItem[item.id] ? 'strikethrough' : ''}
                    >
                      {item.text}
                    </span>
                  </label>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="edit-icon"
                    onClick={() => setEditedItems(item.id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={() => handleDelete(item.id)}
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
