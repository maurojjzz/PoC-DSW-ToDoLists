import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import styles from './list.module.css'
import Card from '../Card'


const List = () => {
  
  const [lists, setLists] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem('listas')) || [];
    setLists(storedLists);
  }, []);

  const watchList=(id, list)=>{
    history.push(`/list/${id}`, {params: {...list}});
  }

  return (
    <div className={`d-flex flex-row gap-5 border justify-content-center align-items-center border-success flex-wrap mt-3 mb-3 me-1 ${styles.listContainer}`}>
      {lists.map((list, index) => (
        <div key={list.id} className={``} onClick={()=>watchList(list.id, list)}>
          <Card  titule={list.title} id={index} list={list}/>
        </div>
      ))}
      
      {console.log(lists)}
    </div>
  )
}

export default List
