import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectPage,
  fetchElementsIfNeeded,
  invalidatePage
} from './redux/actions/actions'
import { deletePostFetchData } from './redux/actions/deletePostActions';
import { putPostFetchData } from './redux/actions/putPostActions';
import { withRouter } from 'react-router-dom';
import Comments from './Comments'

class Post extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleDeletePost = this.handleDeletePost.bind(this)
    this.handleEditPost = this.handleEditPost.bind(this)
  }

  componentDidMount() {
    const dispatch = this.props.dispatch
    const url = this.props.slug + '/' + this.props.match.params.postId;
    dispatch(selectPage(url));
    dispatch(fetchElementsIfNeeded(url));
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedPage } = this.props
    dispatch(invalidatePage(selectedPage))
    dispatch(fetchElementsIfNeeded(selectedPage))
  }

  handleEditPost(e) {
    e.preventDefault()
    this.props.dispatch(putPostFetchData(this.props.match.params.postId, {id: `${this.props.match.params.postId}`,
                                                                          title: this.props.elements.title,
                                                                          body: this.props.elements.body,
                                                                          userId: this.props.elements.userId
                                                                          }))
  }

  handleDeletePost(e) {
    e.preventDefault()
    this.props.dispatch(deletePostFetchData(this.props.match.params.postId))
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
            <p><button onClick={this.handleEditPost}>Edit</button></p>
            <p><button onClick={this.handleDeletePost}>Delete</button></p>
            <React.Fragment>
              <Comments id={ this.props.match.params.postId } />
            </React.Fragment>
          </div>
        )}
      </div>
    )
  }
}

Post.propTypes = {
  selectedPage: PropTypes.string.isRequired,
  elements: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
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