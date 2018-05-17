import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';
import {querySong} from '../graphql/query';
import LyricCreate from './LyricCreate';

class SongDetail extends Component{
    constructor(props){
      super(props)

      this.renderSong = this.renderSong.bind(this)
    }

  renderLyrics(lyrics){
    return lyrics.reduce((acc,{content,id,likes}) => {
        const li = <li key={id}>
          <h5>{content}</h5>
          <h6>Likes {likes}</h6>
        </li>
        acc.push(li)
        return acc;
    },[])
  }

  renderSong(){
    const {loading,song} = this.props.data;
    if(loading){
      return 'loading';
    }else{
      return (
        <div>
          <h4>{song.title}</h4>
        <ul>
          {
            song.lyrics ? this.renderLyrics(song.lyrics) : ''
          }
        </ul>
        </div>
      )
    }
  }

  render(){
    return(
        <div>
          <Link to='/'>Back</Link>
          <div>{this.renderSong()}</div>
          <LyricCreate songId={this.props.match.params.id} data={this.props.data}/>
        </div>
    )
  }
}


export default graphql(querySong,{
  options:(props) => ({variables: {id: props.match.params.id } })
})(SongDetail);
