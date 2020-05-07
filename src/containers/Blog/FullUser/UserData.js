import React, { Component } from 'react'
import { fetchUsers } from '../../../api'

class UserData extends Component {
  state = {
    userData: ''
  }

  async componentDidMount() {
    if (this.props.id) {
      const users = await fetchUsers()
      const filteredUser = users.filter((user) => user.id === this.props.id)
      this.setState({ userData: filteredUser })
    }
  }
  render() {
    console.log(this.state)
    let userData = <p>Loading user data...</p>

    if (this.state.userData) {
      userData = this.state.userData
      console.log(userData)
      return (
        <div>
          <h4>{userData[0].name}</h4>
          <ul>
            <li>email: {userData[0].email}</li>
            <li>phone: {userData[0].phone}</li>
            {<li>company: {userData[0].company.name}</li>}
            <li>
              address:
              <span> {userData[0].address.street}, </span>
              <span> {userData[0].address.suite}, </span>
              <span> {userData[0].address.zipcode}, </span>
              <span> {userData[0].address.city}</span>
            </li>
          </ul>
        </div>
      )
    }

    return <div>{userData}</div>
  }
}

export default UserData
