import Container from "./components/Container.jsx";
import Header from "./components/Header.jsx";
import Form from "./components/Form.jsx";
import Posts from "./components/Posts.jsx";
import Loader from "./components/Loader.jsx";
import { useEffect, useState } from "react";

export const App = () => {

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState('');
  const [message, setMessage] = useState('');
  

  const fetchPosts = async () => {
    try {
        const res = await fetch('https://happy-thoughts-ux7hkzgmwa-uc.a.run.app/thoughts');
        const data = await res.json();
        if(!res.ok){
          throw new Error('💥 Something went wrong 😱')
        }
        console.log(data);
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

    if (newPost.length < 6) {
      setMessage('Your message is too short, it needs at least 5 letters 😔');
      return;
    } else {
      setMessage('');
    } 

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
      if (response.ok) {
        await fetchPosts();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setNewPost("");
    }
  }

  return (
    <Container>
      <Header/>
      <Form onNewPostChange={handleNewPostChange} onFormSubmit={onFormSubmit} message={message} newPost={newPost}/>
      {isLoading && <Loader/>}
      <Posts posts={posts}/>
    </Container>
  )
};
