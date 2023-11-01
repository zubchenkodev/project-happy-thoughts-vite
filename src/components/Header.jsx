import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
        <h1 className={styles.header__title}>Project Happy Thoughts</h1>
        <h2 className={styles.header__subtitle}>Technigo Education Team</h2>
    </header>
  )
}

export default Header