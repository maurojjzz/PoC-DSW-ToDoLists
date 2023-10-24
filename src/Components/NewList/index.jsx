import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import styles from './new-list.module.css'


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
      setTimeout(()=>{history.push('/list')} , 1000)
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
    <div className={`d-flex flex-column align-items-center justify-content-center flex-grow-1 text-light`}>
     <form className={`rounded-3 d-flex flex-column align-items-center justify-content-center ${styles.containerForm}`}>
      <div className={`${styles.groupInputs}`}>
        <label className={`fs-2`} htmlFor="newListTitle">Titulo</label>
        <input 
          className={`${styles.inputTitle}`}
          type="text" 
          value={newListTitle}
          onChange={(e) => setnewListTitle(e.target.value)}
        />
      </div>
      <div  className={`d-flex flex-column ${styles.itemsGroup}`}>
        <h3>Tareas</h3>
        <ul className={`list-unstyled`}>
          {items.map((item) => (
            <li key={item.id}>
              {item.id === editingItemId ? (
                <div >
                  <input
                    className={`me-3 ${styles.editItemInput}`}
                    type="text"
                    value={item.description}
                    onChange={(e) => handleUpdateItem(item.id, e.target.value)}
                  />
                  <button className={`rounded-5 ${styles.btnEditOk}`} onClick={(e) => {e.preventDefault(); handleUpdateItem(item.id, item.description)}}>
                    OK
                  </button>
                </div>
              ) : (
                <div className={`${styles.listItem} d-flex justify-content-between`}>
                  {item.description}
                  <div>
                    <img 
                      className={`${styles.editDelete}`} src={`${process.env.PUBLIC_URL}/images/edit.svg`}  
                      onClick={() => {handleEditItem(item.id)}} alt="edit icon" 
                    />
                    <img 
                      className={`${styles.editDelete}`} 
                      src={`${process.env.PUBLIC_URL}/images/trash.png`} alt="trash icon" 
                      onClick={() => {handleDeleteItem(item.id)}}
                    />
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
        <div>
            <input
              type="text"
              className={`${styles.inputItems}`}
              placeholder="Descripcion"
              value={newItemDescription}
              onChange={(e) => setNewItemDescription(e.target.value)}
            />
            <button 
            className={`${styles.btnAddITem} ms-3 rounded-5`}
            onClick={
              (e)=>{
                e.preventDefault()
                handleAddItem()
              }}
              >+</button>
          </div>
    </div>
      

      <button 
      className={`${styles.btnAddListFin} ms-3 rounded-5`}
      onClick={
        (e)=>{
          e.preventDefault();
          createList();
        } }>Crear Lista</button>

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
