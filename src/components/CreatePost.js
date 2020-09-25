import React from "react";
//import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import renderHTML from 'react-render-html';


class CreatePost extends React.Component {

  constructor(props) {
    super();
    //console.log("IN THE CONSTRUCTOR" + props.post.title);
    this.state = {
      flag: "prompt-for-post",
      // postId: props.post.id,
      // postTitle: props.post.title,
      // postBody: props.post.body,
      // postAuthorId: props.post.author.id,
      // postAuthorFirstName: props.post.author.firstName,
      // postAuthorLastName: props.post.author.lastName,
      // postDate: props.post.date
      errors: {
        postTitleError: "Enter title here",
        postBodyError: "Enter post body here"
      }
    }

    this.savePost = this.savePost.bind(this);
    this.promptForPost = this.promptForPost.bind(this);

  }

  postBodyRef = React.createRef();
  postTitleRef = React.createRef();

  savePost(e) {
    e.preventDefault();
    //this.setState(state => ({flag: "save-post"}));
    
    //console.log("THE NEW POST TEXT IS: " + this.postBodyRef.current.value)
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
    
    // console.log("The new title is: " + newPost.title);
    // console.log("The new body is: " + newPost.body);
    // console.log("The new date is: " + newPost.date);
    axios.post("http://localhost:8080/blogposts/create-blogpost/", newPost)
    .then(response => { 
      console.log("MY RESPONSE: " + response.data);
      this.setState(state => ({flag: "prompt-for-post"}));
      this.props.refreshPosts(); 
    })
    .catch(error => {
        console.log("MY ERROR: " + error.response);
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


newPost() {
  return (

    <div className="col-sm-12 blog-main">

      {this.state.flag === "save-post"
        ?
        <Form onSubmit={this.savePost}>
          <Form.Label>Blog Post Title:</Form.Label>
          <Form.Control ref={this.postTitleRef} placeholder={this.state.errors.postTitleError} type="text" />
          <Form.Label>Blog Post Body:</Form.Label>
          <Form.Control ref={this.postBodyRef} as="textarea" placeholder={this.state.errors.postBodyError} type="text" />
          <div className="text-left">
          <Button onClick={this.savePost} variant="outline-primary">Save</Button>
          </div>
        </Form>
        : //else if prompt for post
        <>
          <div className="text-right">
            {/* <Button onClick={this.props.refresh} variant="outline-secondary" >Refresh Posts</Button> */}
            <Button onClick={this.promptForPost} variant="outline-secondary" >Add New Post</Button>
          </div>
        </>

      }
      {/* { this.state.flag === "show-post" ? : } */}
    </div>
  )
}

render() {
  return this.newPost()
}
}

export default CreatePost;