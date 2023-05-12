import styles from './loginCard.module.css'

export default function LoginCard({ title, children }) {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>
        {title}
      </h1>
      {children}
    </div>
  )
}