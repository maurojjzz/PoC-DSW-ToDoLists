import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./list.module.css";
import Card from "../Card";

const List = () => {
  const [lists, setLists] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("listas")) || [];
    setLists(storedLists);
  }, []);

  const watchList = (id, list) => {
    history.push(`/list/${id}`, { params: { ...list } });
  };
  const newList = () =>{
    history.push('/new-list')
}
  return (
    <div
      className={`d-flex flex-row gap-5 justify-content-center align-items-center flex-grow-1 flex-wrap  ${styles.listContainer}`}
    >
      {lists.length > 0 ? (
        lists.map((list, index) => (
          <div key={list.id} className={``} onClick={() => watchList(list.id, list)}>
            <Card titule={list.title} id={index} list={list.items} />
          </div>
        ))
      ) : (
        <div className={`text-light `}>
          <h2 className={`${styles.title}`}>No tienes ninguna lista creada</h2>
          <div onClick={newList} className={` rounded-3 ${styles.btnAddList}`}>
            Agregar nueva lista de tareas
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
