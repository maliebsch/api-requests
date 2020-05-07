import React, { Component } from 'react'
import { fetchComments } from '../../../api'

class UserComments extends Component {
  state = {
    userComments: []
  }

  async componentDidMount() {
    if (this.props.id) {
      const comments = await fetchComments()
      const filteredComments = comments.filter(
        (comment) => comment.postId === this.props.id
      )
      this.setState({ userComments: filteredComments })
    }
  }

  render() {
    const userComments = this.state.userComments.map((comment) => {
      return (
        <li className="collection-item" key={comment.id}>
          {comment.body}
        </li>
      )
    })

    return (
      <div className="collection with-header">
        <li className="collection-header">
          <h5>User comments</h5>
        </li>
        {userComments}
      </div>
    )
  }
}

export default UserComments
