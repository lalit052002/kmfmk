import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react'

const App = () => {

  const [data,setData]= useState()
    useEffect(()=>{
      axios.get('https://fakestoreapi.com/products').then((response) => {
        setData(response.data);
        console.log(response.data);
      });
       
    },[])

    function createPost() {
      
    axios
      .post('https://fakestoreapi.com/products', {
        title: "Hello World!",
        description: "This is a new post."
      })
        .then((response) => {
          setData(response.data);
          console.lo(data+"after")
        });
    }
  
  return (
    <>
       {/* <h1>{data.title}</h1>
      <p>{data.description}</p> */}
      <button onClick={createPost}>Create Post</button>

    </>
  )
}

export default App
