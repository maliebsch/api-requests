import React, { Component } from 'react'
import CommentsList from '../../../containers/Blog/FullPost/CommentsList.js'
import axios from 'axios'

class FullPost extends Component {
  state = {
    fetchedPost: null,
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .get(
          'https://jsonplaceholder.typicode.com/posts/' +
            this.props.match.params.id,
        )
        .then((resp) => {
          this.setState({ fetchedPost: resp.data })
        })
    }
  }

  render() {
    let post = <p>Select a Post</p>

    if (this.props.match.params.id) {
      post = <p>Content loading...</p>
    }

    if (this.state.fetchedPost) {
      post = (
        <div className="container">
          <div className="post">
            <h4>{this.state.fetchedPost.title}</h4>
            <div className="post-content">{this.state.fetchedPost.body}</div>
          </div>
          <div className="collection">
            <CommentsList postId={this.state.fetchedPost.id} />
          </div>
        </div>
      )
    }

    return post
  }
}
export default FullPost
