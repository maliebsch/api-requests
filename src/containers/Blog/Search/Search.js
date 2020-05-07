import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from '../../../api/index'
import SearchResult from './SearchResult'

class Search extends Component {
  state = {
    query: '',
    users: {},
    filteredUsers: []
  }

  async componentDidMount() {
    const users = await fetchUsers()
    this.setState({ users })
  }

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length >= 1) {
          this.getData()
        } else if (!this.state.query) {
          return <p>Please enter a keyword...</p>
        }
      }
    )
  }

  getData = () => {
    const { users } = this.state
    const query = this.state.query.toLowerCase()
    let matchesName = this.getFilteredNames(users, query)

    let matchesUsername = this.getFilteredUserNames(users, query)

    this.setState({ filteredUsers: [...matchesName, ...matchesUsername] })
  }

  getFilteredNames(users, query) {
    let matchesName = users.filter((user) => {
      const regex = new RegExp(`^${query}`)
      return user.name.toLowerCase().match(regex)
    })

    if (matchesName !== null) {
      matchesName = matchesName.map((result) => {
        return { displayUser: result.name, id: result.id }
      })
    }

    return matchesName
  }

  getFilteredUserNames(users, query) {
    let matchesUsername = users.filter((user) => {
      const regex = new RegExp(`^${query}`)
      return user.username.toLowerCase().match(regex)
    })

    if (matchesUsername !== null) {
      matchesUsername = matchesUsername.map((result) => {
        return { displayUser: result.username, id: result.id }
      })
    }

    return matchesUsername
  }

  render() {
    const resultsList = this.state.filteredUsers.map((user) => {
      return (
        <Link to={'/users/' + user.id} key={user.id}>
          <SearchResult id={user.id} displayResult={user.displayUser} />
        </Link>
      )
    })
    return (
      <div className="container">
        <form>
          <label htmlFor="search">Search by username or name</label>
          <input
            placeholder="Search for..."
            ref={(input) => (this.search = input)}
            onChange={this.handleInputChange}
          />
        </form>
        {<div>{resultsList}</div>}
      </div>
    )
  }
}

export default Search
