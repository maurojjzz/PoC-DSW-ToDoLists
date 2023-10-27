import React, { useState, useEffect } from "react";
import { useParams, useLocation /*, useHistory*/ } from "react-router-dom";
import styles from "./todo.module.css";

const ToDo = () => {
  const [listTitle, setListTitle] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState(false);
  const [newItDesc, setNewItDesc] = useState("");

  // const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const listData = location.state.params;

  useEffect(() => {
    setListTitle(listData.title);
    setItems(listData.items[0]);
  }, [listData.items, listData.title]);

  useEffect(() => {
    const storedLists = JSON.parse(localStorage.getItem("listas")) || [];
    const listData = storedLists.find((list) => list.id === Number(id));
    if (listTitle) {
      listData.title = listTitle;
    }
    if (items) {
      listData.items[0] = items;
    }
    localStorage.setItem("listas", JSON.stringify(storedLists));
    console.log(storedLists);
  }, [id, items, listTitle]);

  const completedItems = items.filter((item) => item.completed).length;
  const totalItems = items.length;
  const progress = (completedItems / totalItems) * 100;

  const deleteItem = (itemId) => {
    const updatedItems = items.filter((i) => i.id !== itemId);
    setItems(updatedItems);
  };

  const addItemToList = () => {
    if (newItDesc) {
      const newItem = { id: items.length, description: newItDesc, completed: false };
      setItems([...items, newItem]);
      setNewItDesc("");
    }
  };

  return (
    <div className={`d-flex flex-direction-column align-items-center justify-content-center flex-grow-1 pt-5 pb-5`}>
      <form className={` d-flex flex-column align-items-center rounded-3  ${styles.containerForm}`}>
        <div className={`progress mb-3 w-100 ${styles.barra}`}>
          <div
            className={`progress-bar ${styles.subBarra}`}
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {`${progress.toFixed(2)}%`}
          </div>
        </div>
        
        <input
          type="text"
          className={` ${styles.titleInput}`}
          value={listTitle}
          onChange={(e) => setListTitle(e.target.value)}
        />

        <ul className={`d-flex flex-column align-items-center list-unstyled w-100 mt-2 `}>
          {Array.isArray(items)
            ? items.map((item) => (
                <div className={`d-flex gap-2 ms-4 mt-4 ${styles.itemsContainer}`} key={item.id}>
                  <div className={`d-flex align-items-center justify-content-center p-2 pe-4 ps-4`}>
                    <input
                      type="checkbox"
                      checked={item.completed}
                      className={`form-check-input`}
                      id={`item${item.id}`}
                      onChange={(e) => {
                        const updatedItems = [...items];
                        updatedItems.find((i) => i.id === item.id).completed = e.target.checked;
                        setItems(updatedItems);
                      }}
                    />
                    <input
                      type="text"
                      className={` ${styles.inputsItems} ms-3 p-1 ${
                        item.completed ? "text-decoration-line-through" : ""
                      }`}
                      id={`item${item.id}`}
                      value={item.description}
                      onChange={(e) => {
                        const updatedItems = [...items];
                        updatedItems.find((i) => i.id === item.id).description = e.target.value;
                        setItems(updatedItems);
                      }}
                    />
                    <img
                      className={`${styles.editDelete}`}
                      src={`${process.env.PUBLIC_URL}/images/trash.png`}
                      alt="trash icon"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteItem(item.id);
                      }}
                    />
                  </div>
                </div>
              ))
            : null}
          {!newItem ? (
            <div className={`mt-4`}>
              <button
                className={`btn btn-primary text-white fw-bold fs-5 me-3`}
                onClick={(e) => {
                  e.preventDefault();
                  setNewItem(true);
                }}
              >
                +
              </button>
            </div>
          ) : (
            <div className={`d-flex gap-3 mt-5 ms-5`}>
              <input
                type="text"
                className={`p-1 ${styles.newItemInput} ${styles.inputsItems}`}
                placeholder="add description"
                onChange={(e) => {
                  setNewItDesc(e.target.value);
                  console.log(newItDesc);
                }}
              />
              <button
                className={`${styles.buttonOK}`}
                onClick={(e) => {
                  e.preventDefault();
                  addItemToList();
                  setNewItem(false);
                }}
              >
                OK
              </button>
            </div>
          )}
        </ul>
      </form>
    </div>
  );
};

export default ToDo;
