import React , {useState, useEffect} from 'react'
import { useParams, useLocation /*, useHistory*/ } from 'react-router-dom';
import styles from './todo.module.css'


const ToDo = () => {
    const [listTitle,setListTitle] = useState('');
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState(false)
    const [newItDesc, setNewItDesc] = useState('')
   
    // const history = useHistory();
    const location = useLocation();
    const {id} = useParams();
    const listData = location.state.params;
    
    useEffect(()=>{
        setListTitle(listData.title);
        setItems(listData.items[0]);
   
    },[listData.items, listData.title])

    useEffect(() => {
       
            const storedLists = JSON.parse(localStorage.getItem('listas')) || [];
            const listData = storedLists.find((list) => list.id === Number(id));
            if (listTitle) {
                listData.title = listTitle
            }
            if(items){
                listData.items[0] = items
            }
            localStorage.setItem('listas', JSON.stringify(storedLists))
            console.log(storedLists)
        
        
    }, [id, items, listTitle ]);

    console.log(items)

    const deleteItem = (itemId) =>{
          const updatedItems = items.filter((i) => i.id !== itemId);
          setItems(updatedItems);
    }

    const addItemToList = ()=>{
        if (newItDesc) {
            const newItem = { id: items.length, description: newItDesc, completed: false };
            setItems([...items, newItem]);
            setNewItDesc('');
          }
    }


  return (
    <div>
      <form>
      <label htmlFor="newListTitle">Title</label>
      <input 
        type="text" 
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
      />

    <ul className={`list-unstyled`}>
    {Array.isArray(items) ? (
        items.map((item)=>(
            <div className={`d-flex gap-2 ms-4 mt-4 ${styles.itemsContainer}`} key={item.id}>
                <input type="checkbox" checked={item.completed} className="form-check-input" id={`item${item.id}`} 
                onChange={(e) => {
                    const updatedItems = [...items];
                    updatedItems.find((i) => i.id === item.id).completed = e.target.checked;
                    setItems(updatedItems);
                }} />
                <input type='text' 
                    className={`form-control ${ item.completed ? 'text-decoration-line-through' : ''}`}
                    id={`item${item.id}`}
                    value={item.description} 
                    onChange={(e) => {
                        const updatedItems = [...items];
                        updatedItems.find((i) => i.id === item.id).description = e.target.value;
                        setItems(updatedItems);
                    }} />
                <button onClick={(e) => {e.preventDefault(); deleteItem(item.id)}}>Eliminar</button>
            </div>
            ))
        ):null}
        {!newItem ? (
        <div className={`mt-2 ms-2`}>
            <button onClick={(e)=>{e.preventDefault();setNewItem(true)}}>+</button>
        </div>
        ) : (
        <div className={`d-flex gap-3 mt-5 ms-5`}>
            <input 
                type="text" 
                className={`form-control ${styles.newItemInput}`} 
                placeholder='add description' 
                onChange={(e) => {
                        setNewItDesc(e.target.value);
                        console.log(newItDesc)
                    }}/>
            <button onClick={(e)=>{e.preventDefault(); addItemToList(); setNewItem(false)}}>OK</button>
        </div>
        )}
        
    </ul>

      </form>
    </div>
  )
}

export default ToDo
