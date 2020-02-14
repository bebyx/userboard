import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { commentsFetchData } from './redux/actions/commentsActions';

class Comments extends Component {
    componentDidMount() {
        this.props.fetchData(this.props.id);
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the comments</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                <h2>Comments</h2>
                <ul>
                    {this.props.comments.map((comment) => (
                        <li key={comment.id}>
                            {comment.body}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        hasErrored: state.commentsHasErrored,
        isLoading: state.commentsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (id) => dispatch(commentsFetchData(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);