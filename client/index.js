import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,Route } from 'react-router-dom'
import {  Switch } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory'
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import './style/style.css';

//import a component
import SongList from './components/SongList'
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';
const cache = new InMemoryCache({
  dataIdFromObject: object => object.id
});
const client = new ApolloClient({
  link:new HttpLink({ uri:"http://localhost:4000/graphql"}),
  cache
})



const history = createBrowserHistory()

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <div>
          <Switch>
            <Route path='/songs/:id' component={SongDetail}/>
            <Route path='/create' component={SongCreate}/>
            <Route exact path='/' component={SongList}/>
          </Switch>
        </div>
      </HashRouter>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
