import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import Constants from '../constants';

const Posts = (props) => {

  const [blogposts, setBlogposts] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);

  async function fetchData() {
    axios.get(`${Constants.BLOG_DATA_API_URL}:${Constants.BLOG_DATA_API_PORT}/blogposts/get-all-posts`)
      .then(res => {
        setBlogposts(res.data);
      })
  }

  useEffect(() => {
    fetchData();
  }, [refreshCount]);

  function refreshPosts() {
    setRefreshCount(refreshCount + 1);
    //console.log("IN THE REFRESH" + refreshCount);
  }

  
  function writePosts(posts) {
    var blogPostsArray = [];

    if (posts.length !== 0) {
      //if (posts !== undefined) {
      //console.log("THE POSTS ARE " + JSON.stringify(posts));

      let postsMonth = props.monthyear === 'current' ? new Date().getMonth() + 1
        : props.monthyear.split("-")[0];

      let postsYear = props.monthyear === 'current' ? new Date().getFullYear()
        : props.monthyear.split("-")[1];


      blogPostsArray = posts.filter(item =>
        (((new Date(item.date).getMonth() + 1) === postsMonth) &&
          (new Date(item.date).getFullYear() === postsYear)));
      //console.log("MILLISECONDS " + (blogPostsArray[0].date).getTime());
      blogPostsArray.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
      //blogPostsArray.map(item => ({ ...item, date: new Date(item.date).toLocaleString()}));
      blogPostsArray = blogPostsArray.map(item => <Post key={item.id} post={item} delete={deletePost} refreshPosts={refreshPosts} />);

      return blogPostsArray;
    }
    else
      return (<h2>Loading ...</h2>);

  }

  function deletePost(e) {
    e.preventDefault();

    let postId = e.target.value;

    axios.delete(`${Constants.BLOG_DATA_API_URL}:${Constants.BLOG_DATA_API_PORT}/blogposts/delete-blogpost/` + postId)
    .then(response => { 
      refreshPosts();
    })
    .catch(error => {
    });
  }

 
  return (
    <div>
      {
        props.login.adminIndex !== "" && props.login.adminIndex !== "error" 
        ? <CreatePost refreshPosts={refreshPosts} /> 
        : ""
      }
      {writePosts(blogposts)}
    </div>
  )

}

const mapStateToProps = state => ({
  login: state.login,
  admins: state.admins
});

export default connect(mapStateToProps)(Posts);
