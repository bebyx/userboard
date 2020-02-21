export function deletePostHasErrored(state = false, action) {
    switch (action.type) {
        case 'DELETE_POST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function deletePostIsLoading(state = false, action) {
    switch (action.type) {
        case 'DELETE_POST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}