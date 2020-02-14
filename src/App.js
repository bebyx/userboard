import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Users from './Users'
import Posts from './Posts'
import Post from './Post'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/posts">Posts</NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <Users slug="users" />
          </Route>
          <Route path="/posts">
            <PostsRoot />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function PostsRoot() {
  let match = useRouteMatch();

  return (
  <Switch>
    <Route path={`${match.path}/:postId`}>
      <Post slug={'posts'} />
    </Route>
    <Route path={match.path}>
      <Posts slug={'posts'} />
    </Route>
  </Switch>
  )
}

export default App;
