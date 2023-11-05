import Container from "./components/Container.jsx";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import Posts from "./components/Posts.jsx";
import Loader from "./components/Loader.jsx";
import { useEffect, useState } from "react";

export const App = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');
  const [postsLikedByUser, setPostsLikedByUser] = useState(() => {
    const storedIds = JSON.parse(localStorage.getItem('postsLikedByUser'))
    return storedIds || []
  });
  

  const fetchPosts = async () => {
    try {
        setError('');
        const res = await fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts');
        const data = await res.json();
        if(!res.ok){
          throw new Error('💥 Something went wrong 😱')
        }
        setPosts(data);
    }
    catch(err){
      console.error(err.message);
      setError(err.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts();

  },[])

  const handleNewPostChange = (event) => {
    if (newPost.length > 140) {
      setMessage('Your message is too long 😔');
    } else {
      setMessage('');
    } 
    
    setNewPost(event.target.value);
  };

  const onFormSubmit = async (event) => {

    event.preventDefault(); 

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "message": newPost
      })
    };
    try {
      const response = await fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts', options);
      if (!newPost) {
        throw new Error('You need to add the text to post your thought 🤓')
      }
      if (newPost.length < 6) {
        throw new Error('Your message is too short, it needs at least 5 letters 🥸')
      }
      if(!response.ok) throw new Error('Something went wrong 😔');
      fetchPosts();
    } catch (error) {
      console.error(`The problem is: ${error.message}`);
      setMessage(error.message)
    } finally {
      setNewPost("");
    }
  }

  

  return (
    <Container>
      <Header postsLikedByUser={postsLikedByUser}/>
      <Form onNewPostChange={handleNewPostChange} onFormSubmit={onFormSubmit} message={message} newPost={newPost}/>
      <Posts posts={posts} postsLikedByUser={postsLikedByUser} setPostsLikedByUser={setPostsLikedByUser} isLoading={isLoading}
      error={error} 
      />
    </Container>
  )
};
