import React from 'react';

import Content from './components/Content/Content';

import './App.scss';

const App = () => {
  return (
    <div className="app">
      <div className="bgc-overlay">
        <Content />
      </div>
    </div >
  );
}

export default App;