import React, { lazy, Suspense } from 'react'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
const Posts = lazy(() => import('./Posts/Posts'))
const FullPost = lazy(() => import('./FullPost/FullPost'))
const FullUser = lazy(() => import('./FullUser/FullUser'))
const Search = lazy(() => import('./Search/Search'))

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
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/posts/:id" component={FullPost} />
            <Route exact path="/users/:id" component={FullUser} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/posts" component={Posts} />
          </Switch>
        </Suspense>
      </header>
    </div>
  )
}

export default Blog
