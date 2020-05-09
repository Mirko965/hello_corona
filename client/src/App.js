import React from 'react';
import { Provider } from 'react-redux'
import './App.css';
import InfectedCountries from './component/InfectedCountries';
import store from './store';
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main className='App-main'>
          <InfectedCountries />
        </main>
        <footer className='App-footer'>
        <Footer />
        </footer>
      </div>
    </Provider>
  );
}

export default App;
