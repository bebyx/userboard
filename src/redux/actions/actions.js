import fetch from 'cross-fetch'

//API
export const REQUEST_ELEMENTS = 'REQUEST_ELEMENTS'
export const RECEIVE_ELEMENTS = 'RECEIVE_ELEMENTS'
export const SELECT_PAGE = 'SELECT_PAGE'
export const INVALIDATE_PAGE = 'INVALIDATE_PAGE'

export function selectPage(url) {
  return {
    type: SELECT_PAGE,
    url
  }
}

export function invalidatePage(url) {
  return {
    type: INVALIDATE_PAGE,
    url
  }
}

function requestElements(url) {
  return {
    type: REQUEST_ELEMENTS,
    url
  }
}

function receiveElements(url, json) {
  return {
    type: RECEIVE_ELEMENTS,
    url,
    elements: json.map(child => child),
    receivedAt: Date.now()
  }
}


function fetchElements(url) {
  return dispatch => {
    dispatch(requestElements(url))
    return fetch(`https://jsonplaceholder.typicode.com/${url}`)
      .then(response => response.json())
      .then(json => dispatch(receiveElements(url, json)))
  }
}

function shouldFetchElements(state, url) {
  const elements = state.elementsByPage[url]
  if (!elements) {
    return true
  } else if (elements.isFetching) {
    return false
  } else {
    return elements.didInvalidate
  }
}

export function fetchElementsIfNeeded(url) {
  return (dispatch, getState) => {
    if (shouldFetchElements(getState(), url)) {
      return dispatch(fetchElements(url))
    }
  }
}