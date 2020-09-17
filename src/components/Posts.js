import React, { useState, useEffect } from 'react';

const Posts = () => {
  
  const [blogposts, setBlogposts] = useState([]);

  async function fetchData() {
    await fetch("http://localhost:8080/blogposts/get-all-posts", {
    //await fetch("http://localhost:8080/blogposts/get-post/5", {
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {setBlogposts(data); console.log(data);})
        .catch(error => console.error(error));
  }

  useEffect(() => {
    fetchData();
  }, []);

  // {post.author && <h2>{post.author.firstName}</h2>}
  // <h3>{post.date}</h3>
  // <p> {post.body} </p>


  // https://stackoverflow.com/questions/47009688/react-fetch-properties-from-nested-json

  // function writePosts(postsArr) {
    
  //   console.log("The first element is: " + postsArr);
  //   console.log(typeof []);
  //   return ["hello", "world"];
    
  // }

  function writeAuthors(posts) {
    var arr = [];
    if (posts !== undefined) {
      for (var i in posts) {
        //console.log("IN THE LOOP: " + posts[index].title);
        arr.push(
                <>
                  <h2>{posts[i].title}</h2>
                  <h3>{posts[i].date}</h3>
                  <h3>{posts[i].author.firstName}</h3>
                  <p>{posts[i].body}</p>
                </>
                );
      }
      //console.log("The ARRAY OF POSTS: " + arr)
      return arr;
    }
    else 
      return ( <h2>Loading ...</h2>);

  }
  return (
    <div>
      {writeAuthors(blogposts)}
    {/* {blogposts.author && <h2>{blogposts.author.firstName}</h2>} */}
    </div>
  )
    
}

export default Posts;