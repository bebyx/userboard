import fetch from 'cross-fetch'

export function deletePostHasErrored(bool) {
    return {
        type: 'DELETE_POST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function deletePostIsLoading(bool) {
    return {
        type: 'DELETE_POST_IS_LOADING',
        isLoading: bool
    };
}

export function deletePostFetchData(id) {
    return (dispatch) => {
        dispatch(deletePostIsLoading(true));

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE'
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(deletePostIsLoading(false));

                return response;
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(() => dispatch(deletePostHasErrored(true)));
    };
}