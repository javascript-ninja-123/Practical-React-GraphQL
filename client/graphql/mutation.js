import gql from 'graphql-tag';

export const mutationSong = gql`
    mutation AddSong($title: String){
      addSong(title:$title) {
        id
        title
      }
    }
`;


export const mutationDeleteSong = gql`
  mutation DeleteSong($id:ID){
    deleteSong(id:$id) {
      id
    }
  }
`


export const mutationAddLyric = gql`
    mutation AddLyric($content: String, $songId:ID!){
    addLyricToSong(content:$content, songId:$songId){
      content
      likes
      id
    }
  }
`


export const mutationAddLikes = gql`
mutation AddLikes($id:ID!){
likeLyric(id:$id){
  likes
  id
}
}
`
