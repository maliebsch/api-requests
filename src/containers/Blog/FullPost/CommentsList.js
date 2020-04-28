import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import User from '../../../components/User/User'

class CommentsList extends Component {
  state = {
    fetchedPostComments: null,
  }
  componentDidMount() {
    if (this.props.postId) {
      axios
        .all([
          axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then((resp) => {
              return resp.data.filter(
                (data) => data.postId === this.props.postId,
              )
            }),
          axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((resp) => {
              return resp.data
            }),
        ])
        .then(
          axios.spread((...responses) => {
            this.compare(responses[0], responses[1])
          }),
        )
    }
  }
  compare(comments, users) {
    let fetchedPostComments = []

    comments.forEach((comment) =>
      users.forEach((user) => {
        if (comment.id === user.id) {
          fetchedPostComments.push({
            comment: comment,
            name: user.name,
            id: user.id,
          })
        }
      }),
    )
    this.setState({ fetchedPostComments })
  }

  render() {
    let fetchedComments = <p>Loading comments</p>
    if (this.state.fetchedPostComments) {
      fetchedComments = this.state.fetchedPostComments.map((comment) => {
        return (
          <Link to={'/users/' + comment.id} key={comment.id}>
            <User
              id={comment.comment.id}
              name={comment.name}
              comment={comment.comment.body}
            />
          </Link>
        )
      })
    }

    return fetchedComments
  }
}

export default CommentsList
