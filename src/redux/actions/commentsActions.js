import fetch from 'cross-fetch'

export function commentsHasErrored(bool) {
    return {
        type: 'COMMENTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function commentsIsLoading(bool) {
    return {
        type: 'COMMENTS_IS_LOADING',
        isLoading: bool
    };
}

export function commentsFetchDataSuccess(comments) {
    return {
        type: 'COMMENTS_FETCH_DATA_SUCCESS',
        comments
    };
}

export function commentsFetchData(id) {
    return (dispatch) => {
        dispatch(commentsIsLoading(true));

        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(commentsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((comments) => dispatch(commentsFetchDataSuccess(comments)))
            .catch(() => dispatch(commentsHasErrored(true)));
    };
}