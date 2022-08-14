import styles from './Layout.module.scss'

import Header from '../../modules/Header/Header.jsx'

// Основная разметка приложения

export default function Layout({ children }) {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}
