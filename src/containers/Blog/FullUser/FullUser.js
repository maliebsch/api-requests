import React, { Component } from 'react'
import PhotoGallery from './PhotoGallery'
import UserComments from './UserComments'
import UserData from './UserData'

class FullUser extends Component {
  render() {
    return (
      <div className="container">
        <UserData id={parseInt(this.props.match.params.id)} />
        <UserComments id={parseInt(this.props.match.params.id)} />
        <PhotoGallery id={parseInt(this.props.match.params.id)} />
      </div>
    )
  }
}

export default FullUser
