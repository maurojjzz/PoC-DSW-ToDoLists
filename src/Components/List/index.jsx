import React, {useState, useEffect} from 'react'
import styles from './list.module.css'
import Card from '../Card'

const List = () => {
  
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('listas')) || [];
    setLists(storedLists);
  }, []);

  

  return (
    <div className={`d-flex flex-row gap-5 border justify-content-center align-items-center border-success flex-wrap mt-3 mb-3 me-1 ${styles.listContainer}`}>
      {lists.map((list, index) => (
        <div className={``} onClick={()=>console.log(list)}>
          <Card  titule={list.title} id={index}/>
        </div>
      ))}
      
      {console.log(lists)}
    </div>
  )
}

export default List
