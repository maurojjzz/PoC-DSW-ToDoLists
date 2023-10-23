import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';


const NewList = ({onAddList}) => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setnewListTitle] =  useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [items, setItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState('');
  const [loading, setLoading] = useState(false)

  const history = useHistory();

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('listas')) || [];
    setLists(storedLists);
  }, []);

  const addToArray = (newListTitle, newItem) => {
    const newList = { id:lists.length ,title: newListTitle, items: [items] };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    localStorage.setItem('listas', JSON.stringify(updatedLists));
  }

  const createList = () =>{
    if(newListTitle){
      let listName = newListTitle;
      setnewListTitle('');
      addToArray(listName);
      setLoading(true);
      setTimeout(()=>{history.push('/list')} , 2000)
    }
  }

  const handleAddItem = () => {
    if (newItemDescription) {
      const newItem = { id: items.length, description: newItemDescription, completed: false };
      setItems([...items, newItem]);
      setNewItemDescription('');
    }
  };

  const handleEditItem = (id) => {
    setEditingItemId(id);
  };

  const handleUpdateItem = (id, updatedDescription) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, description: updatedDescription } : item
    );
    setItems(updatedItems);
    setEditingItemId('');
  };

  const handleDeleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };
  

  return (
    <div>
     <form>
     <label htmlFor="newListTitle">Title</label>
      <input 
        type="text" 
        value={newListTitle}
        onChange={(e) => setnewListTitle(e.target.value)}
      />

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.id === editingItemId ? (
              <div>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                />
                <button onClick={(e) => {e.preventDefault(); handleUpdateItem(item.id, item.description)}}>
                  OK
                </button>
              </div>
            ) : (
              <div>
                {item.description}
                <button onClick={(e) => {e.preventDefault(); handleEditItem(item.id)}}>Editar</button>
                <button onClick={(e) => {e.preventDefault(); handleDeleteItem(item.id)}}>Eliminar</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div>
          <div>
            <input
              type="text"
              placeholder="Nueva descripción"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
            />
            <button onClick={
              (e)=>{
                e.preventDefault()
                handleAddItem()
              }}
              >+</button>
          </div>
      </div>

      <button onClick={
        (e)=>{
          e.preventDefault();
          createList();
        } }>Add List</button>

     </form>
     {loading ? (<div class="d-flex justify-content-center align-items-center">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>) :null}
    </div>
  )
}


export default NewList
