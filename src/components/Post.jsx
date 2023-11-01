import React from 'react'
import styles from './Post.module.css';

const Post = ({post}) => {

  const createdAt = new Date(post.createdAt);

  const currentDate = new Date();

  const timeDifference = currentDate - createdAt;

  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

  const minutesAgo = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));


  return (
    <div className={styles.post}>
        <p>{post.message}</p>
        <div className={styles.post__info}>
            <div className={styles.post__like}>
                <button type="button" id="likeBtn" className={styles.post__button}>
                    <span className={styles.post__emoji} aria-label="like button">❤️</span>
                </button>
                <span className={styles.post__likes}>x{post.hearts}</span>
            </div>
            <div className={styles.post__time}>{`${ hoursAgo > 0 ? `${hoursAgo} hours and `  : ''} ${minutesAgo} minutes ago`}</div>
        </div>
    </div>
  )
}

export default Post