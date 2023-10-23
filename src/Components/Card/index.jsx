import React from 'react'
import styles from './card.module.css'

const Card = ({titule, id, list}) => {
  return (
    <div className={`d-flex flex-column justify-content-between border border-warning rounded-3 ${styles.cardContainer}`}>
      <h3 className={`ms-2 mt-1`}>{titule}</h3>
      <p className={`ms-2 mt-1`}>{id}</p>
      <div className={`ms-2 mb-2`}>Podrian ir las cantidad de tasks hechas x ejemplo 1/3</div>
    </div>
  )
}

export default Card
