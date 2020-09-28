import React from "react";
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
    }

    this.editPost = this.editPost.bind(this);
    this.savePost = this.savePost.bind(this);
    this.formatDate = this.formatDate.bind(this);
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

    // if (month.length < 2)
    //   month = '0' + month;
    // if (day.length < 2)
    //   day = '0' + day;
//2020-09-13 10:46:48.563-04
    let dateString = `${dayOfWeek},  ${month}/${day}/${year} ${hours}:${minutes}:${seconds} UTC`; 
    //return [year, month, day].join('-') + " " + hours;
    return dateString;
  }

  savePost(e) {
    e.preventDefault();
    this.setState(state => ({ flag: "show-post" }));

    this.setState(state => ({ postBody: this.postBodyRef.current.value }));
    this.setState(state => ({ postTitle: this.postTitleRef.current.value }));

    let updatedPost = {
      id: this.state.postId,
      title: this.postTitleRef.current.value,
      body: this.postBodyRef.current.value,
      date: this.state.postDate,
      author: {
        id: 1,
        firstname: "Ghassan",
        lastname: "Nasr",
        type: "admin",
        username: "lorem",
        password: "ipsum"
      }
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


  showPost() {
    return (

      <div className="col-sm-12 blog-main">
        <div className="blog-post">
          {this.state.flag === "show-post" ?
            <>
              <div>
                <h2 className="blog-post-title">{this.state.postTitle}</h2>
                <p className="blog-post-meta">{this.formatDate(this.state.postDate)} by
              <Link className="link-anchor-author" to="#"> {this.state.postAuthorFirstName} {this.state.postAuthorLastName}</Link>
                </p>
                {renderHTML(this.state.postBody)}
              </div>

              {this.props.login.adminIndex !== "" && this.props.login.adminIndex !== "error"
                ?
                <>
                  <Button onClick={this.editPost} variant="outline-secondary">Edit</Button>
                  <Button value={this.state.postId} onClick={this.props.delete} variant="outline-secondary">Delete</Button>
                </>

                : ""
              }

            </>
            : (this.state.flag === "edit-post" ?
              <Form >
                <Form.Label>Blog Post Title:</Form.Label>
                <Form.Control ref={this.postTitleRef} defaultValue={this.state.postTitle} type="text" ></Form.Control>
                <Form.Label>Blog Post Body:</Form.Label>
                <Form.Control ref={this.postBodyRef} as="textarea" defaultValue={this.state.postBody} type="text" >
                </Form.Control>
                <Button onClick={this.savePost} variant="outline-primary">Save</Button>
              </Form>
              : {}
            )
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

const mapStateToProps = state => ({
  login: state.login,
  admins: state.admins
});

export default connect(mapStateToProps)(Post);