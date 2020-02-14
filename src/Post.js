import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectPage,
  fetchElementsIfNeeded,
  invalidatePage
} from './redux/actions/actions'
import { withRouter } from 'react-router-dom';

class Post extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(selectPage(this.props.slug + '/' + this.props.match.params.postId))
    this.props.dispatch(fetchElementsIfNeeded(this.props.slug + '/' + this.props.match.params.postId))
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedPage } = this.props
    dispatch(invalidatePage(selectedPage))
    dispatch(fetchElementsIfNeeded(selectedPage))
  }

  render() {
    const { selectedPage, elements, isFetching, lastUpdated } = this.props
    return (
      <div>
        <h1 style={ {textTransform: `capitalize`} }> { selectedPage }</h1>
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
        {elements && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <table>
              <tbody>
                <tr>
                  <td>{elements.id}</td>
                  <td>{elements.userId}</td>
                  <th>{elements.title}</th>
                  <td>{elements.body}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    )
  }
}

Post.propTypes = {
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

export default withRouter(connect(mapStateToProps)(Post));