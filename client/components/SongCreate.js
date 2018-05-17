import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';
import {mutationSong} from '../graphql/mutation';
import {querySongs} from '../graphql/query';

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
      },
      refetchQueries:[{query:querySongs}]
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




export default graphql(mutationSong)(SongCreate);
