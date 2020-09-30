import React from "react";
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import renderHTML from 'react-render-html';
import Constants from '../constants';

class Post extends React.Component {

  constructor(props) {
    super();
    this.state = {
      flag: "show-post",
      postId: props.post.id,
      postTitle: props.post.title,
      postBody: props.post.body,
      postDate: props.post.date,
      postAuthor: props.admins[0], //this code assumes there is one author, the one stored at index 0 of the admins array in the Redux store
    }

    this.editPost = this.editPost.bind(this);
    this.savePost = this.savePost.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.writePost = this.writePost.bind(this);
    this.isAdminLoggedIn = this.isAdminLoggedIn.bind(this);
    this.writeEditAndDeleteButtons = this.writeEditAndDeleteButtons.bind(this);
    this.writeEditPostFormWithSaveButton = this.writeEditPostFormWithSaveButton.bind(this);
  }

  postBodyRef = React.createRef();
  postTitleRef = React.createRef();

  formatDate(date) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(date),
      month = '' + (d.getUTCMonth() + 1),
      day = '' + d.getUTCDate(),
      year = d.getUTCFullYear(),
      dayOfWeek = days[d.getDay()],
      hours = d.getUTCHours(),
      minutes = d.getUTCMinutes(),
      seconds = d.getUTCSeconds();

    let dateString = `${dayOfWeek},  ${month}/${day}/${year} ${hours}:${minutes}:${seconds} UTC`; 
    return dateString;
  }

  savePost(e) {
    e.preventDefault();
    this.setState(state => ({ flag: "show-post" }));

    this.setState(state => ({ postBody: this.postBodyRef.current.value }));
    this.setState(state => ({ postTitle: this.postTitleRef.current.value }));

    console.log("THE AUTHOR IS: " + this.state.postAuthor['firstname'])
    let updatedPost = {
      id: this.state.postId,
      title: this.postTitleRef.current.value,
      body: this.postBodyRef.current.value,
      date: this.state.postDate,
      author: this.state.postAuthor,
    }

    axios.put(`${Constants.BLOG_DATA_API_URL}:${Constants.BLOG_DATA_API_PORT}/blogposts/update-blogpost/` + this.state.postId, updatedPost)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response)
      });
  }

  editPost() {
    this.setState(state => ({ flag: "edit-post" }));
  }

  writePost() {
    return (
      <>
      <div>
        <h2 className="blog-post-title">{this.state.postTitle}</h2>
        <p className="blog-post-meta">
          {this.formatDate(this.state.postDate)} by Ghassan Nasr
                </p>
        {renderHTML(this.state.postBody)}
      </div>
      {
        this.isAdminLoggedIn() ? this.writeEditAndDeleteButtons() : ""
      }
      </>
    );
  }

  isAdminLoggedIn() {
    return(
      this.props.login.adminIndex !== "" && this.props.login.adminIndex !== "error"
    );
  }

  writeEditAndDeleteButtons() {
    return (
      <>
        <Button onClick={this.editPost} variant="outline-secondary">Edit</Button>
        <Button value={this.state.postId} onClick={this.props.delete} variant="outline-secondary">Delete</Button>
      </>
    );
  }

  writeEditPostFormWithSaveButton() {
    return (
      <Form >
        <Form.Label>Blog Post Title:</Form.Label>
        <Form.Control ref={this.postTitleRef} defaultValue={this.state.postTitle} type="text" ></Form.Control>
        <Form.Label>Blog Post Body:</Form.Label>
        <Form.Control ref={this.postBodyRef} as="textarea" defaultValue={this.state.postBody} type="text" >
        </Form.Control>
        <Button onClick={this.savePost} variant="outline-primary">Save</Button>
      </Form>
    );
  }

  showPost() {
    return (
      <div className="col-sm-12 blog-main">
        <div className="blog-post">
          { 
            this.state.flag === "show-post"
              ? this.writePost()
              : this.state.flag === "edit-post" ? this.writeEditPostFormWithSaveButton() : {}
          }
        </div>
      </div>
    )
  }

  render() {
    return this.showPost()
  }
}

const mapStateToProps = state => ({
  login: state.login,
  admins: state.admins
});

export default connect(mapStateToProps)(Post);