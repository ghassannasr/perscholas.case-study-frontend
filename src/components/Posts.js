import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';
import CreatePost from './CreatePost';

const Posts = (props) => {

  const [blogposts, setBlogposts] = useState([]);

  async function fetchData() {
    axios.get("http://localhost:8080/blogposts/get-all-posts")
      //axios.get("http://3.22.118.142:8080/blogposts/get-all-posts")
      .then(res => {
        setBlogposts(res.data); console.log("THE REQUEST" + res.data);
      })
  }

  useEffect(() => {
    fetchData();
  }, []);


  function writePosts(posts) {
    var blogPostsArray = [];

    if(posts.length !== 0) {
    //if (posts !== undefined) {
      console.log("THE POSTS ARE " + JSON.stringify(posts));

      let postsMonth = props.monthyear === 'current' ? new Date().getMonth() + 1
        : props.monthyear.split("-")[0];

      let postsYear = props.monthyear === 'current' ? new Date().getFullYear()
        : props.monthyear.split("-")[1];


      blogPostsArray = posts.filter(item =>
        (((new Date(item.date).getMonth() + 1) === postsMonth) &&
          (new Date(item.date).getFullYear() === postsYear)));
      console.log("THE LENGTH OF THE ARRAY IS " + blogPostsArray.length);
      blogPostsArray = blogPostsArray.map(item => <Post key={item.id} post={item} />);
      return blogPostsArray;
    }
    else
      return (<h2>Loading ...</h2>);

  }

  return (
    <div>
      <CreatePost />
      {writePosts(blogposts)}
    </div>
  )

}

// const mapStateToProps = state => ({
//   blogPosts: state.blogPosts
// });

//export default connect(mapStateToProps)(Posts);
export default Posts;