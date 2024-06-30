import React, { useState } from 'react';
import '../assets/Add_ToDo_Item.css';
import { Button, FormGroup, FormLabel, TextArea, Form } from '@carbon/react';

const AddToDoItem = ({ onClose, onAddItem }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (description.trim() === '') {
      alert('Description cannot be empty');
      return;
    }
    const existingItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
    const newItem = { description };
    localStorage.setItem('todoItems', JSON.stringify([...existingItems, newItem]));

    onAddItem();
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel >
              Add a ToDo Item
            </FormLabel>
            <br></br>
            <br></br>
              <TextArea
                id="description"
                labelText=""
                rows={14}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter your task description"
              />
          </FormGroup>
          <div className='formButtons'>
            <Button kind="danger" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button kind="primary" type="submit">
              Add Item
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddToDoItem;
