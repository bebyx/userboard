import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  selectPage,
  fetchElementsIfNeeded,
  invalidatePage
} from './redux/actions/actions'
import { withRouter, Link } from 'react-router-dom';

class Users extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
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
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Address</th>
                  <th>Phone</th>
                  <th>Website</th>
                  <th>Company</th>
                </tr>
              </thead>
          		<tbody>
        		{elements.map((element) => (
          			<tr key={element.id}>
          				<tb>{element.name}</tb>
          				<td>{element.username}</td>
                  <td>
                    {element.address && element.address.street },&nbsp;
                    {element.address && element.address.suite },&nbsp;
                    {element.address && element.address.city },&nbsp;
                    {element.address && element.address.zipcode }
                  </td>
          				<td>{element.phone}</td>
          				<td><a href={`http://${element.website}`} target='_blank' rel="noopener noreferrer">{element.website}</a></td>
                  <td>
                    Company: { element.company && element.company.name }<br/>
                    Slogan: { element.company && element.company.catchPhrase }<br/>
                    Service: { element.company && element.company.bs }
                  </td>
          			</tr>
        		))};
        		  </tbody>
        	</table>
          </div>
        )}
        <p><Link to="/posts"><button>Posts</button></Link></p>
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

export default withRouter(connect(mapStateToProps)(Users));