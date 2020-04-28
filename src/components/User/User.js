import React from 'react'

const User = (props) => {
  return (
    <li className="collection-item d-flex" key={props.id}>
      <span className="comment-author">{props.name}</span>
      <span className="comment">{props.comment}</span>
    </li>
  )
}

export default User
