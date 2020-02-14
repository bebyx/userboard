import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectPage,
  fetchElementsIfNeeded,
  invalidatePage
} from './redux/actions/actions'
import { withRouter, Link } from 'react-router-dom';

class Posts extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(selectPage(this.props.slug))
    this.props.dispatch(fetchElementsIfNeeded(this.props.slug))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedPage } = this.props
    dispatch(invalidatePage(selectedPage))
    dispatch(fetchElementsIfNeeded(selectedPage))
  }

  handleChange(selectedUser) {
    const { dispatch, selectedPage } = this.props
    if (selectedUser.target.value === 'All') {
      dispatch(invalidatePage(selectedPage))
      dispatch(selectPage(this.props.slug))
      dispatch(fetchElementsIfNeeded(this.props.slug))
    } else {
      dispatch(invalidatePage(selectedPage))
      dispatch(selectPage('posts' + '?userId=' + selectedUser.target.value))
      dispatch(fetchElementsIfNeeded("posts" + '?userId=' + selectedUser.target.value))
    }

  }

  render() {
    const { selectedPage, elements, isFetching, lastUpdated } = this.props
    return (
      <div>
        <h1 style={ {textTransform: `capitalize`} }> { selectedPage }</h1>
        <select onChange={this.handleChange}>
          {['All',1, 2,3,4,5,6,7,8,9,10].map(e => (
            <option value={e} key={e}>
              {e}
            </option>
          ))}
        </select>
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isFetching && elements.length === 0 && <h2>Loading...</h2>}
        {!isFetching && elements.length === 0 && <h2>Empty.</h2>}
        {elements.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <table>
              <tbody>
            {
              elements.map((element) => (
                <tr key={element.id}>
                  <td>{element.userId}</td>
                  <th>{element.title}</th>
                  <td>{element.body}</td>
                  <td>
                    <Link to={`${this.props.match.url}/${element.id}`}><button>Details</button></Link>
                  </td>
                </tr>
            ))
            }
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

Posts.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  elements: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  const { selectedPage, elementsByPage } = state
  const { isFetching, lastUpdated, items: elements } = elementsByPage[
    selectedPage
  ] || {
    isFetching: true,
    items: []
  }
  return {
    selectedPage,
    elements,
    isFetching,
    lastUpdated
  }
}

export default withRouter(connect(mapStateToProps)(Posts));