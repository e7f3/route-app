import styles from './Header.module.scss'

import Logo from '../../elements/Logo/Logo.jsx'

// Компонент - header страницы

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.content}>
        <Logo />
      </div>
    </header>
  )
}
