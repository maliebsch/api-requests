import React from 'react'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
import Posts from './Posts/Posts'
import FullPost from './FullPost/FullPost'
import FullUser from './FullUser/FullUser'
import Search from './Search/Search'

const Blog = () => {
  return (
    <div>
      <header>
        <nav className="green lighten-3">
          <div className="nav-wrapper">
            <div className="container">
              <Link to="/posts" className="brand-logo" id="home">
                Blog
              </Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li id="nav-link">
                  <NavLink to="/posts" exact activeClassName="active">
                    Posts
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/search" exact>
                    <i className="material-icons">search</i>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/posts/:id" component={FullPost} />
          <Route exact path="/users/:id" component={FullUser} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/posts" component={Posts} />
        </Switch>
      </header>
    </div>
  )
}

export default Blog
