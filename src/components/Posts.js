import React, { useState, useEffect } from 'react';
//import { connect } from 'react-redux';
import Post from './Post';
import axios from 'axios';

import Example from './layout/Test';

//import { Editor } from 'react-draft-wysiwyg';
//import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
        setBlogposts(res.data); console.log("THE REQUEST" + res.data);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);


  function writeAuthors(posts) {
    var blogPostsArray = [];
  
    if (posts !== undefined) {
      
    blogPostsArray = posts.map(item => <Post key={item.id} post={item} />);
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