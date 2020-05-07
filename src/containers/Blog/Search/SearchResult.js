import React from 'react'

const SearchResult = (props) => {
  return (
    <div className="SearchResult">
      <div className="d-flex">
        <p className="green-text">{props.displayResult}</p>
      </div>
    </div>
  )
}

export default SearchResult
