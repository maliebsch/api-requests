import React, { Component } from 'react'
import axios from 'axios'
import PhotoGallery from './PhotoGallery'

class FullUser extends Component {
  state = {
    userComments: [],
    user: null
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      axios
        .all([
          axios
            .get('https://jsonplaceholder.typicode.com/comments')
            .then((resp) => {
              return resp.data.filter(
                (data) => data.postId == this.props.match.params.id
              )
            }),
          axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((resp) => {
              return resp.data
            })
        ])
        .then(
          axios.spread((...responses) => {
            this.compare(responses[0], responses[1])
            this.getUserData(responses[1])
          })
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
            id: user.id
          })
        }
      })
    )
    this.setState({ userComments })
  }

  getUserData(users) {
    let user = null
    const propsId = parseInt(this.props.match.params.id)

    user = users.filter(function (user) {
      return user.id === propsId
    })

    this.setState({ user })
  }

  render() {
    let userComments = ''

    if (this.state.userComments) {
      userComments = this.state.userComments.map((comment) => {
        return (
          <li className="collection-item" key={comment.comment.id}>
            {comment.comment.body}
          </li>
        )
      })
    }

    return (
      <div className="container">
        {this.state.user ? (
          <div>
            <h4>{this.state.user[0].name}</h4>
            <ul>
              <li>email: {this.state.user[0].email}</li>
              <li>phone: {this.state.user[0].phone}</li>
              <li>company: {this.state.user[0].company.name}</li>
              <li>
                address:
                <span> {this.state.user[0].address.street}, </span>
                <span> {this.state.user[0].address.suite}, </span>
                <span> {this.state.user[0].address.zipcode}, </span>
                <span> {this.state.user[0].address.city}</span>
              </li>
            </ul>
          </div>
        ) : null}

        <div className="collection with-header">
          <li className="collection-header">
            <h5>User comments</h5>
          </li>
          {userComments}
        </div>
        <PhotoGallery id={parseInt(this.props.match.params.id)} />
      </div>
    )
  }
}

export default FullUser
