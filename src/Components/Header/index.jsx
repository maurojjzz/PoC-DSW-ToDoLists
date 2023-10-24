import React from 'react'
import { useHistory } from 'react-router-dom'
import styles from './header.module.css'

const Header = () => {

  const history = useHistory()

  const newList = () =>{
      history.push('/new-list')
  }

  const mainPage = () =>{
    history.push('/list')
}

  return (
    <div className={`d-flex flex-row justify-content-around align-items-center p-3 text-light ${styles.headerCont}`}>
        <div className={`${styles.cursor}`} onClick={mainPage}>
            <h1>LISTS</h1>
        </div>
        <div className={`${styles.btnList} px-4 rounded-3 `} onClick={newList}>
           Nueva Tarea
        </div>
    </div>
  )
}

export default Header;
