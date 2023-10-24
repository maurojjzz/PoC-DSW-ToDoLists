import React from 'react'
import styles from './card.module.css'


const Card = ({titule, id, list}) => {
  const items = list[0];
  const completedItems = items.filter((item) => item.completed).length;
  const totalItems = items.length;
  const progress = (completedItems / totalItems) * 100;

  return (
    <div className={`d-flex flex-column justify-content-between text-light rounded-3 p-2 ${styles.cardContainer}`}>
      <h3 className={``}>{titule}</h3>
      <p className={`mt-2 mb-1`}>Tareas: {completedItems}/{totalItems} </p>
      <p className={`mb-2`}>Progreso:</p>

      <div className={`progress ${styles.barra}`}>
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
    </div>
  )
}

export default Card
