import React, { Component } from 'react'
import axios from 'axios'

class PhotoGallery extends Component {
  state = {
    photos: []
  }

  componentDidMount() {
    if (this.props.id) {
      axios.get('https://jsonplaceholder.typicode.com/photos').then((resp) => {
        const photos = resp.data.filter(
          (data) => data.albumId === this.props.id
        )
        this.setState({ photos })
      })
    }
  }
  render() {
    let userPhotos = null
    if (this.state.photos) {
      userPhotos = this.state.photos.slice(0, 5).map((photo) => {
        return <img src={photo.thumbnailUrl} alt="img" key={photo.id} />
      })
    }
    return <div>{userPhotos}</div>
  }
}

export default PhotoGallery
