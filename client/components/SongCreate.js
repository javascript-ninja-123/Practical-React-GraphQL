import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';

class SongCreate extends Component{

  constructor(props){
    super(props);
    this.state = {
      title:''
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    this.setState({title:e.target.value})
  }

  onSubmit(e){
    e.preventDefault();
    this.props.mutate({
      variables:{
        title:this.state.title
      }
    })
    .then(() => {
      this.props.history.push('/')
    })
    .catch(err => {
      alert('was not able to create a song')
    })
  }

  render(){
    return(
      <div className='container'>
          <Link to='/'>Back</Link>
          <h3>Create a song</h3>
          <form onSubmit={this.onSubmit.bind(this)}>
            <label>Song title:</label>
            <input
              value={this.state.title}
              onChange={this.onChange}
            />
            <button type='submit'>Add</button>
          </form>
      </div>
    )
  }
}

const mutation = gql`
    mutation AddSong($title: String){
      addSong(title:$title) {
        title
      }
    }
`;


export default graphql(mutation)(SongCreate);
