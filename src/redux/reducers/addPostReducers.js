export function addPostHasErrored(state = false, action) {
    switch (action.type) {
        case 'ADD_POST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function addPostIsLoading(state = false, action) {
    switch (action.type) {
        case 'ADD_POST_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}