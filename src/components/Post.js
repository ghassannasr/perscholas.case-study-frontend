import React from "react";
//import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';


class Post extends React.Component {

  constructor(props) {
    super();
    //console.log("IN THE CONSTRUCTOR" + props.post.title);
    this.state = {
      flag: "show-post",
      postId: props.post.id,
      postTitle: props.post.title,
      postBody: props.post.body,
      postAuthorId: props.post.author.id,
      postAuthorFirstName: props.post.author.firstName,
      postAuthorLastName: props.post.author.lastName,
      postDate: props.post.date
    }

    this.editPost = this.editPost.bind(this);
    this.savePost = this.savePost.bind(this);

  }

  postBodyRef = React.createRef();

  savePost(e) {
    e.preventDefault();
    this.setState(state => ({flag: "show-post"}));
    
    //console.log("THE NEW POST TEXT IS: " + this.postBodyRef.current.value)
    this.setState(state => ({postBody: this.postBodyRef.current.value}));

    let updatedPost = {
      id: this.state.postId,
      title: this.state.postTitle,
      body: this.postBodyRef.current.value,
      date: this.state.postDate,
      author: {
          id: this.state.postAuthorId,
      }
    }

    //let postJson = updatedPost.json
    console.log("MY UPDATED POST " + JSON.stringify(updatedPost));
    axios.put("http://localhost:8080/blogposts/update-blogpost/" + this.state.postId, updatedPost)
    .then(response => { 
      console.log("MY RESPONSE: " + response)
    })
    .catch(error => {
        console.log("MY ERROR: " + error.response)
    });


  }
  
  editPost() {
    this.setState(state => ({flag: "edit-post"}));
  }


  showPost() {
    return (
      <div>
        <h3>ID: {this.state.postId}</h3>
        <h3>Title{this.state.postTitle}</h3>
        <h4>Author: {this.state.postAuthorFirstName} {this.state.postAuthorLastName}</h4>
        <h4>Date: {this.state.postDate}</h4>
        { this.state.flag === "show-post" ?
          <>
          <p>{this.state.postBody}</p>
          <Button onClick={this.editPost} variant="outline-secondary">Edit</Button>
          </>
          : 
         <Form onSubmit={this.savePost}>
          <Form.Control ref={this.postBodyRef} as="textarea" defaultValue={this.state.postBody} type="text" >
          {/* {this.state.postBody} */}
          </Form.Control>
          <Button onClick={this.savePost} variant="outline-primary">Save</Button>
        </Form>
        }
        {/* { this.state.flag === "show-post" ?
          
          : 
         
        } */}
      </div>
    )
  }
  
  render() {
    return this.showPost()
    }
}
  
export default Post;