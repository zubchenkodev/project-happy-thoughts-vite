import React from 'react';
import styles from './Posts.module.css';
import Post from "./Post.jsx";
import Loader from './Loader';

const Posts = ({posts, postsLikedByUser, setPostsLikedByUser, isLoading, error}) => {

  if(isLoading) return <Loader/>

  if(error) return <p>🥲 {error}</p>

  return (
    <div className={styles.posts}>
      {posts.map((post) => {
        return <Post key={post._id} post={post} postsLikedByUser={postsLikedByUser} setPostsLikedByUser={setPostsLikedByUser}/>
      })}
    </div>
  )
}

export default Posts