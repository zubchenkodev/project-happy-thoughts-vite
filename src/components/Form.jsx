import React from 'react';
import styles from './Form.module.css';

const Form = ({newPost, onNewPostChange, onFormSubmit, message}) => {

  return (
    <div className={styles.postform}>
        <h2>What is making you happy right now?</h2>
        <form onSubmit={onFormSubmit}>
            <textarea 
              rows="3" 
              placeholder="'If music be the food of love, play on.' – William Shakespeare"
              value={newPost}
              onChange={onNewPostChange}
            ></textarea>
            <div className={styles.postform__info}>
              <p className={styles.postform__error}>{message && message}</p>
              <p className={`${styles.postform__length} ${newPost && newPost.length > 140 ? styles.postform__lengthRed : '' }`}>{ newPost ? newPost.length : 0}/140</p>
            </div>
            <button type="submit" id="submitPostBtn" aria-label="button for submiting your post" disabled={message}>
              <span className={styles.postform__emoji} aria-label="heart emoji">❤️</span> Send Happy Thought <span className={styles.postform__emoji} aria-label="heart emoji">❤️</span>
            </button>
        </form>
    </div>
  )
}

export default Form