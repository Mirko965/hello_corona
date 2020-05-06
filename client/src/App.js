import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import InfectedCountries from './component/InfectedCountries';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          Hello corona
        </header>
        <InfectedCountries />
      </div>
    </Provider>
  );
}

export default App;
