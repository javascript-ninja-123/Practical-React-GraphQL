import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';
import {querySongs} from '../graphql/query';
import {mutationDeleteSong} from '../graphql/mutation';


class SongList extends Component{

  constructor(prop){
    super(prop)
    this.onClick = this.onClick.bind(this);

  }

  onClick(id){
    this.props.mutate({
      variables:{id}
    })
    .then(() => this.props.data.refetch())
  }


  renderSongs() {
    const {songs,loading} = this.props.data;
    if(loading){
      return <li>it is loading</li>
    }else{
      return songs.reduce((acc,{id,title}) => {
        const li = <li
                  className='collection-item'
                  key={id}>
                  <Link to={`/songs/${id}`}>{title}</Link>
                  <i
                    onClick={() => this.onClick(id)}
                    className='material-icons'
                    >delete</i>
              </li>
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


export default graphql(mutationDeleteSong)(
  graphql(querySongs)(SongList)
);
