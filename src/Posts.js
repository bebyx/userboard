import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Posts extends Component {
  render() {
    return (
      <ul>
        {this.props.elements.map((element, i) => (
          <li key={i}>{element.name}{element.title}</li>
        ))}
      </ul>
    )
  }
}

Posts.propTypes = {
  elements: PropTypes.array.isRequired
}