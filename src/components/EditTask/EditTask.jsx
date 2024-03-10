import { useEffect, useRef, useState } from 'react';
import './EditTask.scss';

export default function EditTask({ item, itemSave }) {
  const [editItem, setEditItem] = useState(item.text);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  const handleEdit = () => {
    itemSave(item.id, editItem);
  };

  return (
    <input
      ref={ref}
      type="text"
      value={editItem}
      onChange={(e) => setEditItem(e.target.value)}
      onBlur={handleEdit}
      onKeyDown={(e) => {
        // Save on Enter key
        if (e.key === 'Enter') {
          ref.current.blur(); // triggers onBlur
        }
      }}
      className="edit-input"
    />
  );
}
