import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import GetCountry from './component/GetCountry';
import store from './store';
import '../node_modules/react-vis/dist/style.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          Hello corona
        </header>
        <div className='App-cases'>
          <GetCountry />
        </div>
      </div>
    </Provider>
  );
}

export default App;
