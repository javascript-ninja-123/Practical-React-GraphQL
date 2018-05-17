import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {Link} from 'react-router-dom';
import {querySong} from '../graphql/query';
import {mutationAddLikes} from '../graphql/mutation';
import LyricCreate from './LyricCreate';

class SongDetail extends Component{
    constructor(props){
      super(props)

      this.renderSong = this.renderSong.bind(this)
      this.like = this.like.bind(this)
    }


    like(id,likes){
      this.props.mutate({
        variables:{id},
        optimisticResponse:{
          __typename:"Mutation",
          likeLyric:{
            id,
            __typename:"LyricType",
            likes:likes + 1
          }
        },
        refetchQueries:[{query:querySong, variables:{id: this.props.match.params.id }}]
      })
    }

  renderLyrics(lyrics){
    return lyrics.reduce((acc,{content,id,likes}) => {
        const li = <li key={id} className='collection-item'>
          <h5>{content}</h5>
          <h6>Likes {likes}</h6>
          <i className='material-icons' onClick={() => this.like(id,likes)}>thumb_up</i>
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
        <ul className='collection container'>
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


export default graphql(mutationAddLikes)(
  graphql(querySong,{
   options:(props) => ({variables: {id: props.match.params.id } })
 })(SongDetail)
);
