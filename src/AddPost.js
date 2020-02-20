import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPostFetchData } from './redux/actions/addPostActions';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: 1,
            title: '',
            body: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()

        if (!this.state.title.length || !this.state.body.length) {
            alert("All fields should be filled in!");
            return;
        }

        this.props.fetchData(this.state)
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
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
                <input name="title" value={this.state.title} onChange={this.handleChange}/>
                <textarea name="body" value={this.state.body} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        addPostSuccess: state.addPostSuccess,
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