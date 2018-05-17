import gql from 'graphql-tag';

export const querySongs = gql`
  {
    songs{
      title
      id
    }
  }
`;


export const querySong = gql`
  query fetchSong($id: ID!) {
  song(id: $id) {
    id
    title
    lyrics{
      id
      content
      likes
    }
  }
  }
`
