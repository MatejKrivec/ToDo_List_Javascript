import React, { useState, useEffect } from 'react';
import './App.scss';
import { Button, Checkbox, IconButton, ContainedList, ContainedListItem, UnorderedList, ListItem } from '@carbon/react'; 
import Add_ToDo_Item from './pages/Add_ToDo_Item';



function App() {
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [todoItems, setTodoItems] = useState([]);

  const toggleAddItem = () => {
    setAddItemVisible(!addItemVisible);
  };

  useEffect(() => {
    handleLoadItems();
  }, []);

  const handleLoadItems = () => {
    const storedItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
    setTodoItems(storedItems);
  };

  const handleDeleteItem = (index) => {
    const storedItems = JSON.parse(localStorage.getItem('todoItems') || '[]');
    storedItems.splice(index, 1);
    localStorage.setItem('todoItems', JSON.stringify(storedItems));
    setTodoItems(storedItems);
  };

  const handleToggleComplete = (index) => {
    const updatedItems = [...todoItems];
    updatedItems[index].completed = !updatedItems[index].completed;
    localStorage.setItem('todoItems', JSON.stringify(updatedItems));
    setTodoItems(updatedItems);
  };

  

  return (
    <>
      {addItemVisible ? (
        <Add_ToDo_Item onClose={toggleAddItem} onAddItem={handleLoadItems} />
      ) : (
        <>
          <div className='title'>
            <h1>ToDo list</h1>
          </div>
          <div>
            <Button className='addItemBtn' kind="primary" onClick={toggleAddItem}>
              Add a to do item
            </Button>
          </div>
          <div className='list'>
            {todoItems.length === 0 ? (
              <p>No items in the list.</p>
            ) : (
              <UnorderedList>
                {todoItems.map((item, index) => (
                  <ContainedListItem key={index}>
                    <div className={`item ${item.completed ? 'completed' : ''}`}>
                      <div className='checkbox'>
                      <Checkbox
                        labelText={''}
                        id={`checkbox-${index}`}
                        checked={item.completed}
                        onChange={() => handleToggleComplete(index)}
                      />
                      </div>
                      
                      <div className='description'>
                        {item.description}
                      </div>
                    <Button
                      className='deleteBtn'
                      kind="danger"
                      size="sm"
                      onClick={() => handleDeleteItem(index)}
                      >
                        Delete
                    </Button>
                    </div>
                  </ContainedListItem>
                ))}
              </UnorderedList>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;