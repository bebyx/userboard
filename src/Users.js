import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectPage,
  fetchElementsIfNeeded,
  invalidatePage
} from './redux/actions/actions'

class Users extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  componentDidMount() {
    this.props.dispatch(selectPage(this.props.slug))
    const { dispatch, selectedPage } = this.props
    dispatch(fetchElementsIfNeeded(selectedPage))
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedPage !== prevProps.selectedPage) {
      const { dispatch, selectedPage } = this.props
      dispatch(fetchElementsIfNeeded(selectedPage))
    }
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
        {elements.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <ul>
        		{elements.map((element, i) => (
          			<li key={i}>{element.name}{element.title}</li>
        		))}
     		</ul>
          </div>
        )}
      </div>
    )
  }
}
Users.propTypes = {
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

export default connect(mapStateToProps)(Users)