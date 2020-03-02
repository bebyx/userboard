import fetch from 'cross-fetch'

export function putPostHasErrored(bool) {
    return {
        type: 'PUT_POST_HAS_ERRORED',
        hasErrored: bool
    };
}

export function putPostIsLoading(bool) {
    return {
        type: 'PUT_POST_IS_LOADING',
        isLoading: bool
    };
}

export function putPostFetchData(id, data) {
    return (dispatch) => {
        dispatch(putPostIsLoading(true));

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(putPostIsLoading(false));

                return response;
            })
            .then(response => response.json())
            .then(json => console.log(json))
            .catch(() => dispatch(putPostHasErrored(true)));
    };
}