import React, { Component } from 'react'
import axios from 'axios'

class FullUser extends Component {
  state = {
    userComments: [],
  }
  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .all([
          axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then((resp) => {
              return resp.data.filter(
                (data) => data.postId == this.props.match.params.id,
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
    let userComments = []

    comments.forEach((comment) =>
      users.forEach((user) => {
        if (comment.postId === user.id) {
          userComments.push({
            comment: comment,
            name: user.name,
          })
        }
      }),
    )
    this.setState({ userComments })
  }

  render() {
    let userComments = ''
    if (this.state.userComments) {
      userComments = this.state.userComments.map((comment) => {
        return (
          <li className="collection-item" key={comment.id}>
            {comment.comment.body}
          </li>
        )
      })
    }
    return (
      <div className="container">
        <h4>{this.state.userComments.name}</h4>
        <div className="collection">{userComments}</div>
      </div>
    )
  }
}

export default FullUser
