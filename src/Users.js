import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectPage,
  fetchElementsIfNeeded,
  invalidatePage
} from './redux/actions/actions'
import { withRouter } from 'react-router-dom';

class Users extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(selectPage(this.props.slug))
    this.props.dispatch(fetchElementsIfNeeded(this.props.slug))
  }

  componentWillUnmount() {

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
          	<table>
          		<tbody>
        		{elements.map((element) => (
          			<tr key={element.id}>
          				<th>{element.name}</th>
          				<td>{element.username}</td>
                  <td>{element.company.name}</td>
          				<td>Phone: {element.phone}</td>
          				<td>Web: <a href={`http://${element.website}`} target='_blank' rel="noopener noreferrer">{element.website}</a></td>
          			</tr>
        		))};
        		  </tbody>
        	</table>
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

export default withRouter(connect(
  mapStateToProps,
  null,
  null,
  {
    pure: false
  }
  )(Users));