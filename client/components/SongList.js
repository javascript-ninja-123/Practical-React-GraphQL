import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';
import gql from 'graphql-tag';

class SongList extends Component{

  onClick(id){
    console.log(id)
  }

  renderSongs() {
    const {songs,loading} = this.props.data;
    if(loading){
      return <li>it is loading</li>
    }else{
      return songs.reduce((acc,{id,title}) => {
        const li = <li
          className='collection-item'
          key={id} onClick={() => this.onClick(id)}>{title}</li>
        acc.push(li)
        return acc;
      },[])
    }
  }

  render(){
    return(
      <div className='container'>
        <ul className='collection'>
          {this.renderSongs()}
        </ul>
        <Link to='/create' className='btn-floating btn-large red right'>
          <i className='material-icons'>add</i>
        </Link>
    </div>
    )
  }
}

const query = gql`
  {
    songs{
      title
      id
    }
  }
`;

export default graphql(query)(SongList);
