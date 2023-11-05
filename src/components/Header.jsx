import React from 'react';
import styles from './Header.module.css';

const Header = ({postsLikedByUser}) => {

  const uniquePostsLikedByUser = [... new Set(postsLikedByUser)];

  return (
    <header className={styles.header}>
        <h1 className={styles.header__title}>Project Happy Thoughts</h1>
        <h2 className={styles.header__subtitle}>Technigo Education Team</h2>
        {postsLikedByUser.length !== 0  ? 
          <p className={styles.header__info}>Unique posts you liked: {uniquePostsLikedByUser.length}</p>
          :
          <p className={styles.header__info}>No posts have been liked by you so far.</p>
        }
    </header>
  )
}

export default Header