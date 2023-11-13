import styles from './index.module.css'

function GradientCircle({className}) {
  return (
    <div className={`${styles.circle} ${className}`}></div>
  )
}

export default GradientCircle