import fetch from 'cross-fetch'

export function addPostHasErrored(bool) {
    return {
        type: 'ADD_POST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function addPostIsLoading(bool) {
    return {
        type: 'ADD_POST_IS_LOADING',
        isLoading: bool
    };
}

export function addPostFetchDataSuccess(bool) {
    return {
        type: 'ADD_POST_FETCH_DATA_SUCCESS',
        addPostSuccess: bool
    };
}

export function addPostFetchData(data) {
    return (dispatch) => {
        dispatch(addPostIsLoading(true));

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(addPostIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((json) => dispatch(addPostFetchDataSuccess(true)))
            .catch(() => dispatch(commentsHasErrored(true)));
    };
}