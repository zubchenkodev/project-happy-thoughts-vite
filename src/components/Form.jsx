import React from 'react';
import styles from './Form.module.css';

const Form = () => {
  return (
    <div className={styles.postform}>
        <h2>What is making you happy right now?</h2>
        <form>
            <textarea rows="3" placeholder="'If music be the food of love, play on.' – William Shakespeare"></textarea>
            <div className={styles.postform__info}><p className={styles.postform__error}></p><p className={styles.postform__length}>0/140</p></div>
            <button type="submit" id="submitPostBtn" aria-label="button for submiting your post"><span className={styles.postform__emoji} aria-label="heart emoji">❤️</span> Send Happy Thought <span className={styles.postform__emoji} aria-label="heart emoji">❤️</span></button>
        </form>
    </div>
  )
}

export default Form