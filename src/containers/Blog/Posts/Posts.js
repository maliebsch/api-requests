import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Post from '../../../components/Post/Post'

class Posts extends Component {
  state = {
    updatedPosts: [],
    selectedPostId: null,
  }

  componentDidMount() {
    this.getPostsAndUsers().then(
      axios.spread((...responses) => {
        this.convertIntoUpdatedPosts(responses[0].slice(0, 10), responses[1])
      }),
    )
  }

  getPostsAndUsers() {
    return axios.all([
      axios.get('https://jsonplaceholder.typicode.com/posts').then((resp) => {
        return resp.data
      }),
      axios.get('https://jsonplaceholder.typicode.com/users').then((resp) => {
        return resp.data
      }),
    ])
  }

  convertIntoUpdatedPosts(posts, users) {
    const updatedPosts = []

    posts.forEach((post) =>
      users.forEach((user) => {
        if (post.userId === user.id) {
          updatedPosts.push({
            post: post,
            username: user.username,
          })
        }
      }),
    )
    this.setState({ updatedPosts })
  }

  selectedPostHandler = (id) => {
    this.setState({ selectedPostId: id })
  }

  render() {
    const postList = this.state.updatedPosts.map((post) => {
      return (
        <Link to={'/posts/' + post.post.id} key={post.post.id}>
          <Post
            title={post.post.title}
            username={post.username}
            clicked={() => this.selectedPostHandler(post.post.id)}
          />
        </Link>
      )
    })

    return (
      <div className="container">
        <section className="posts">
          <ul className="collection">{postList}</ul>
        </section>
      </div>
    )
  }
}

export default Posts
