import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';
import Constants from '../constants';

const Posts = (props) => {

  const [blogposts, setBlogposts] = useState([]);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  async function fetchData() {
    axios.get(`${Constants.BLOG_DATA_API_URL}:${Constants.BLOG_DATA_API_PORT}/blogposts/get-all-posts`)
      .then(res => {
        setBlogposts(res.data);
      })
  }

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [refreshCount]);

  function refreshPosts() {
    setRefreshCount(refreshCount + 1);
  }

  
  /*
  * This method filters in blog posts that were authored in 'monthyear' to the current month. If the method 
  * writePosts below has this method call commented out, then the application lists all posts 
  * in the main blog content area, regardless of date. Eventually, this application will only list current 
  * month posts, and will have a series of links to posts from past months (one link per month per year)
  */
  function filterMonthYearPosts(posts, monthyear) {
    let postsMonth = props.monthyear === monthyear ? new Date().getMonth() + 1
        : props.monthyear.split("-")[0];

      let postsYear = props.monthyear === monthyear ? new Date().getFullYear()
        : props.monthyear.split("-")[1];

      posts = posts.filter(item =>
        (((new Date(item.date).getMonth() + 1) === postsMonth) &&
          (new Date(item.date).getFullYear() === postsYear)));
      return posts;
  }

  function writePosts(blogPostsArray) {
      //blogPostsArray = filterMonthYearPosts(blogPostsArray, 'current');
      blogPostsArray.sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf());
      blogPostsArray = blogPostsArray.map(item => 
          <Post key={item.id} post={item} delete={deletePost} refreshPosts={refreshPosts} />);

      return blogPostsArray;
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

  function isAdminLoggedIn() {
    return(props.login.adminIndex !== "" && props.login.adminIndex !== "error");
  }

  /*
  * Because the axios API call above is asynchronous, the Posts component will render at least once
  * before axios returns with its payload. Any reference to the payload in the component's renderer 
  * will be undefined and lead a runtime error, unless handled correctly. Therefore, a "isLoading" flag
  * is added to this component's state to keep track of whether axios has completed. Since useEffect() 
  * is in charge of monitoring the axios call fetchData(), the isLoading flag is set from true to false 
  * by useEffect() once fetchData() completes. 
  */
  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <div>
      { isAdminLoggedIn() ? <CreatePost refreshPosts={refreshPosts} /> : "" }
      { writePosts(blogposts) }
    </div>
  )
}

const mapStateToProps = state => ({
  login: state.login,
  admins: state.admins
});

export default connect(mapStateToProps)(Posts);
