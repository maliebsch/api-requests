import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Post from '../../../components/Post/Post'
import { fetchUsers, fetchPosts } from '../../../api'

class Posts extends Component {
  state = {
    updatedPosts: [],
    selectedPostId: null
  }

  async componentDidMount() {
    const posts = await fetchPosts()
    const users = await fetchUsers()
    this.convertIntoUpdatedPosts(posts.slice(0, 10), users)
  }

  convertIntoUpdatedPosts(posts, users) {
    const updatedPosts = []

    posts.forEach((post) => {
      users.forEach((user) => {
        if (post.userId === user.id) {
          updatedPosts.push({
            post: post,
            username: user.username
          })
        }
      })
    })
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
