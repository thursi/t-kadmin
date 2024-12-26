import React from 'react';
import logo from './logo.svg';
import { Providers } from 'providers';
import { Router } from 'router';

function App() {
  return (
    <React.Fragment>
      <Providers>
        <Router />
      </Providers>
    </React.Fragment>
  );
}

export default App;
