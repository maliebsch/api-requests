import React from 'react'

const Post = (props) => {
  return (
    <li className="collection-item" key={props.id} onClick={props.clicked}>
      <h5 className="post-title">{props.title}</h5>
      <div className="post-author green-text text-lighten-3">
        {props.username}
      </div>
    </li>
  )
}

export default Post
