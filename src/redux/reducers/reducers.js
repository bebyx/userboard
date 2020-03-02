import { combineReducers } from 'redux'
import {comments, commentsHasErrored, commentsIsLoading} from './commentsReducers'
import {addPostHasErrored, addPostIsLoading} from './addPostReducers'
import {deletePostHasErrored, deletePostIsLoading} from './deletePostReducers'
import {putPostHasErrored, putPostIsLoading} from './putPostReducers'

import {
  SELECT_PAGE,
  INVALIDATE_PAGE,
  REQUEST_ELEMENTS,
  RECEIVE_ELEMENTS } from '../actions/actions';

function selectedPage(state = 'users', action) {
  switch (action.type) {
    case SELECT_PAGE:
      return action.url
    default:
      return state
  }
}

function elements(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_PAGE:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_ELEMENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ELEMENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.elements,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function elementsByPage(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_PAGE:
    case RECEIVE_ELEMENTS:
    case REQUEST_ELEMENTS:
      return Object.assign({}, state, {
        [action.url]: elements(state[action.url], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  elementsByPage,
  selectedPage,
  comments,
  commentsHasErrored,
  commentsIsLoading,
  addPostHasErrored, 
  addPostIsLoading,
  deletePostHasErrored, 
  deletePostIsLoading,
  putPostHasErrored,
  putPostIsLoading
})

export default rootReducer