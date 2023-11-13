import styles from "./index.module.css";

function Card({children}) {
  return (
    <div className={styles.card}>{children}</div>
  )
}

export default Card;