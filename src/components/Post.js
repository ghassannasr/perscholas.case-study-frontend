import React from "react";
//import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import renderHTML from 'react-render-html';


class Post extends React.Component {

  constructor(props) {
    super();
    //console.log("IN THE CONSTRUCTOR" + props.post.title);
    this.state = {
      flag: "show-post",
      postId: props.post.id,
      postTitle: props.post.title,
      postBody: props.post.body,
      //postAuthorId: props.post.author.id,
      //postAuthorFirstName: props.post.author.firstName,
      //postAuthorLastName: props.post.author.lastName,
      postDate: props.post.date
    }

    this.editPost = this.editPost.bind(this);
    this.savePost = this.savePost.bind(this);
    //this.deletPost = this.deletPost.bind(this);

  }

  postBodyRef = React.createRef();
  postTitleRef = React.createRef();

  savePost(e) {
    e.preventDefault();
    this.setState(state => ({flag: "show-post"}));
    
    //console.log("THE NEW POST TEXT IS: " + this.postBodyRef.current.value)
    this.setState(state => ({postBody: this.postBodyRef.current.value}));
    this.setState(state => ({postTitle: this.postTitleRef.current.value}));

    let updatedPost = {
      id: this.state.postId,
      title: this.postTitleRef.current.value,
      body: this.postBodyRef.current.value,
      date: this.state.postDate,
      author_id: 1
      // author: {
      //     id: this.state.postAuthorId,
      // }
    }

    //let postJson = updatedPost.json
    console.log("MY UPDATED POST " + JSON.stringify(updatedPost));
    // axios.put("http://3.22.118.142:8080/blogposts/update-blogpost/" + this.state.postId, updatedPost)
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

      <div className="col-sm-12 blog-main">

        <div className="blog-post">
          {/* <h3>ID: {this.state.postId}</h3> */}
          <h2 className="blog-post-title">{this.state.postTitle}</h2>
          <p className="blog-post-meta">Date: {this.state.postDate} by 
          <Link className="link-anchor-author" to="#"> {this.state.postAuthorFirstName} {this.state.postAuthorLastName}</Link>
           </p>
          {this.state.flag === "show-post" ?
            <>
              <div>
              {renderHTML(this.state.postBody)}
              </div>
              <Button onClick={this.editPost} variant="outline-secondary">Edit</Button>
            </>
            : //if state is edit-post
            <Form onSubmit={this.savePost}>
              <Form.Label>Blog Post Title:</Form.Label>
              <Form.Control ref={this.postTitleRef} defaultValue={this.state.postTitle} type="text" ></Form.Control>
              <Form.Label>Blog Post Body:</Form.Label>
              <Form.Control ref={this.postBodyRef} as="textarea" defaultValue={this.state.postBody} type="text" >
                {/* {this.state.postBody} */}
              </Form.Control>
              <Button onClick={this.savePost} variant="outline-primary">Save</Button>
            </Form>
          }
          {/* { this.state.flag === "show-post" ? : } */}
        </div>
      </div>
    )
  }
  
  render() {
    return this.showPost()
    }
}
  
export default Post;