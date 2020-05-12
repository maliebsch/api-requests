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
          document.querySelector('.infoText').innerHTML = ''
        } else if (!this.state.query) {
          document.querySelector(
            '.infoText'
          ).innerHTML = `Please enter a keyword`
          this.setState({ filteredUsers: [] })
        }
      }
    )
  }

  getData = () => {
    const { users } = this.state

    let searchResultsByName = this.filterUsersByProperty(
      users,
      (user) => user.name
    )

    let searchResultsByUserName = this.filterUsersByProperty(
      users,
      (user) => user.username
    )

    this.setState({
      filteredUsers: [...searchResultsByName, ...searchResultsByUserName]
    })
  }

  filterUsersByProperty(users, getUserValue) {
    let searchResults = []
    const query = this.state.query.toLowerCase()
    const regex = new RegExp(`^${query}`)

    users
      .filter((user) => {
        return getUserValue(user).toLowerCase().match(regex)
      })
      .map((filteredUser) =>
        searchResults.push({
          displayUser: getUserValue(filteredUser),
          id: filteredUser.id
        })
      )

    return searchResults
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
        <div className="infoText"></div>
        <div>{resultsList}</div>
      </div>
    )
  }
}

export default Search
