import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPost } from './redux/actions/addPostActions';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            title: '',
            body: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error posting.</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                <h1>Add Post</h1>
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addPostSuccess: state.addPostSuccess
        hasErrored: state.addPostHasErrored,
        isLoading: state.addPostIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (data) => dispatch(addPostFetchData(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);