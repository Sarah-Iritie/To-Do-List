import { useState } from 'react';
import './AddTask.scss';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AddTask({ newTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    newTask(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="form-input"
        placeholder="Add your text"
      />
      <button type="submit" className="form-btn">
        Add
      </button>
      <button type="submit" className="plus-icon">
        <FontAwesomeIcon icon={faCirclePlus} className="add-icon" />
      </button>
    </form>
  );
}
