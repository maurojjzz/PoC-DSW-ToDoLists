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
    <div className={`d-flex flex-row justify-content-around align-items-center border border-success ${styles.headerCont}`}>
        <div className={``} onClick={mainPage}>
            <h1>TO DO LISTS</h1>
        </div>
        <div onClick={newList}>
            <h2>New list</h2>
        </div>
    </div>
  )
}

export default Header;
