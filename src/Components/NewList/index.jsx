import React, {useState, useEffect} from 'react'

const NewList = ({onAddList}) => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setnewListTitle] =  useState('');

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('listas')) || [];
    setLists(storedLists);
  }, []);

  const addToArray = (newListTitle) => {
    const newList = { id:lists.length ,title: newListTitle, items: [] };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    localStorage.setItem('listas', JSON.stringify(updatedLists));
  }

  const createList = () =>{
    if(newListTitle){
      let listName = newListTitle;
      setnewListTitle('');
      console.log(listName);
      addToArray(newListTitle);
    }
  }

  

  return (
    <div>
     <form>
      <input 
        type="text" 
        value={newListTitle}
        onChange={(e) => setnewListTitle(e.target.value)}
      />
      <button onClick={
        (e)=>{
          e.preventDefault();
          createList();
        } }>Agregar Lista</button>

     </form>
    </div>
  )
}


export default NewList
