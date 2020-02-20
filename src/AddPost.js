import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPostFetchData } from './redux/actions/addPostActions';

class AddPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            userId: 1
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

        this.setState ({
            title: '',
            body: '',
            userId: 1
        })
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
                <p><input name="title" value={this.state.title} onChange={this.handleChange}/></p>
                <p><textarea name="body" value={this.state.body} onChange={this.handleChange}/></p>
                <select name="userId" onChange={this.handleChange}>
                  {[1,2,3,4,5,6,7,8,9,10].map(e => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <p><button onClick={this.handleSubmit}>Submit</button></p>
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