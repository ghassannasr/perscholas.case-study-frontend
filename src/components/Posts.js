import React, { useState, useEffect } from 'react';
//import { connect } from 'react-redux';
import Post from './Post';
import axios from 'axios';

const Posts = (props) => {

  const [blogposts, setBlogposts] = useState([]);

  async function fetchData() {
    // await fetch("http://localhost:8080/blogposts/get-all-posts", {
    //       method: "GET"
    //   })
    //     .then(response => response.json())
    //     .then(data => {setBlogposts(data); console.log(data);})
    //     .catch(error => console.error(error));

    axios.get("http://localhost:8080/blogposts/get-all-posts")
      .then(res => {
        setBlogposts(res.data)
      })
  }

  useEffect(() => {
    fetchData();
  }, []);


  function writeAuthors(posts) {
    var blogPostsArray = [];
    if (posts !== undefined) {
      for (var i in posts) {

        blogPostsArray.push(
          <Post key={posts[i].id} post={posts[i]} />
        );
      }

      //props.dispatch({ type: "POPULATE_BLOGPOSTS", payload: posts })
      return blogPostsArray;
    }
    else
      return (<h2>Loading ...</h2>);

  }
  return (
    <div>
      {writeAuthors(blogposts)}
    </div>
  )

}

// const mapStateToProps = state => ({
//   blogPosts: state.blogPosts
// });

//export default connect(mapStateToProps)(Posts);
export default Posts;