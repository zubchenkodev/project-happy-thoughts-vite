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

  useEffect(() => {
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
    fetchPosts();

  },[])


  return (
    <Container>
      <Header/>
      <Form/>
      {isLoading && <Loader/>}
      <Posts posts={posts}/>
    </Container>
  )
};
