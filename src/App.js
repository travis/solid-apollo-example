import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { SolidLink } from 'solid-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from "graphql-tag";

import logo from './logo.svg';
import './App.css';


const context = {
  "@context": {
    "foaf": "http://xmlns.com/foaf/0.1/",
    "name": "foaf:name",
  }
};

const QUERY = gql`
query @single(scope: all) {
  id
  name
}`;

function Profile() {
  const { data } = useQuery(QUERY)
  return (
    <p>
      {data && data.name}
    </p>
  )
}

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache({ addTypename: false }),
    link: new SolidLink(context, ["https://tvachon.inrupt.net/profile/card#me"])
  })

  return (
    <div className="App">
      <header className="App-header">
        <ApolloProvider client={client}>
          <Profile/>
        </ApolloProvider>
      </header>
    </div>
  );
}

export default App;
