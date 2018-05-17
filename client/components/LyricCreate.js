import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import {mutationAddLyric} from '../graphql/mutation'
import {querySong} from '../graphql/query';
class LyricCreate extends Component{

    constructor(props){
      super(props)
      this.state = {
        lyric:''
      }
      this.onClick = this.onClick.bind(this)
    }

    onClick(e){
      e.preventDefault();
      this.props.mutate({
        variables:{songId:this.props.songId, content:this.state.lyric}
      })
      .then(() => this.setState({lyric:''}))
      .then(() => this.props.data.refetch())
    }


    render(){
      return(
        <div className='container'>
        <label>Add a lyric</label>
        <input
          onChange={(e) => this.setState({lyric:e.target.value})}
          value={this.state.lyric}
        />
        <button onClick={this.onClick}>add lyric</button>
        </div>
      )
    }
}


export default graphql(mutationAddLyric)(LyricCreate)
