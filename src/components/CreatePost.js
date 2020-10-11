import React from "react";
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import Constants from "../constants";


class CreatePost extends React.Component {

  constructor(props) {
    super();
    this.state = {
      flag: "prompt-for-post",
      errors: {
        postTitleError: "Enter title here",
        postBodyError: "Enter post body here"
      }
    }

    this.savePost = this.savePost.bind(this);
    this.promptForPost = this.promptForPost.bind(this);
    this.writeCreatePostForm = this.writeCreatePostForm.bind(this);
    this.writeAddNewPostButton = this.writeAddNewPostButton.bind(this);
  }

  postBodyRef = React.createRef();
  postTitleRef = React.createRef();

  savePost(e) {
    e.preventDefault();
    this.setState(state => ({postBody: this.postBodyRef.current.value}));

    let newPost = {
      //id: this.state.postId,
      title: this.postTitleRef.current.value,
      body: this.postBodyRef.current.value,
      date: new Date().toLocaleString(),
      author: {
        "id": 1,
        "firstname": "Ghassan",
        "lastname": "Nasr",
        "type": "admin",
        "username": "lorem",
        "password": "ipsum"
      }  
    }
    
    axios.post(`${Constants.BLOG_DATA_API_URL}:${Constants.BLOG_DATA_API_PORT}/blogposts/create-blogpost/`, newPost)
    .then(response => { 
      this.setState(state => ({flag: "prompt-for-post"}));
      this.props.refreshPosts(); 
    })
    .catch(error => {
        this.setState(state => ({ 
                                  flag: "save-post",
                                  errors: {
                                    postTitleError: "Error in saving post",
                                    postBodyError: "Error in saving post"
                                  }
                                }
                      ));
    }); 
  }
  
  promptForPost() {
    this.setState(state => ({flag: "save-post"}));
  }

  writeCreatePostForm() {
    return(
      <Form onSubmit={this.savePost}>
          <Form.Label>Blog Post Title:</Form.Label>
          <Form.Control ref={this.postTitleRef} placeholder={this.state.errors.postTitleError} type="text" />
          <Form.Label>Blog Post Body:</Form.Label>
          <Form.Control ref={this.postBodyRef} as="textarea" placeholder={this.state.errors.postBodyError} type="text" />
          <div className="text-left">
          <Button onClick={this.savePost} variant="outline-primary">Save</Button>
          </div>
      </Form>
    )
  }

  writeAddNewPostButton() {
    return(
      <div className="text-right">
        <Button onClick={this.promptForPost} variant="outline-secondary" >Add New Post</Button>
      </div>)
  }


  newPost() {
    return (
      <div className="col-sm-12 blog-main">
        {
          this.state.flag === "save-post"
            ? this.writeCreatePostForm()
            : this.writeAddNewPostButton()         
        }
      </div>
    )
  }

  render() {
    return this.newPost()
  }
}

export default CreatePost;