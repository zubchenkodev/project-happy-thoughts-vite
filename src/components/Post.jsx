import React, { useEffect, useState } from 'react'
import styles from './Post.module.css';


const Post = ({post, postsLikedByUser, setPostsLikedByUser}) => {

  const createdAt = new Date(post.createdAt);

  const currentDate = new Date();

  const timeDifference = currentDate - createdAt;

  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

  const minutesAgo = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const [likes, setLikes] = useState(post.hearts);


  const onAddLike = async (post) => {
  
    const url = `https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts/${post._id}/like`;
    try {
      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...post, hearts: likes + 1 }),
      });

      if (!response.ok) throw new Error('Something went wrong');
      setLikes((likes) => likes + 1);
      setPostsLikedByUser([...postsLikedByUser, post._id])
      localStorage.setItem('postsLikedByUser', JSON.stringify([...postsLikedByUser, post._id]))


    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div className={styles.post}>
        <p>{post.message}</p>
        <div className={styles.post__info}>
            <div className={styles.post__like}>
                <button 
                  type="button" 
                  id="likeBtn" 
                  className={`${styles.post__button} ${postsLikedByUser.includes(post._id) ? styles.post__buttonLiked : ''}`} 
                  onClick={() => onAddLike(post)}>
                    <span className={styles.post__emoji} aria-label="like button">❤️</span>
                </button>
                <span className={styles.post__likes}>x{likes}</span>
            </div>
            <div className={styles.post__time}>
            {minutesAgo == 0 && hoursAgo  == 0 ? 
              'less than a minute ago' :
              minutesAgo < 60 && hoursAgo == 0 ?
              `${minutesAgo} ${minutesAgo == 1 ? 'minute' : 'minutes'} ago` :
              'more than hour ago'
            }
            </div>
        </div>
    </div>
  )
}

export default Post