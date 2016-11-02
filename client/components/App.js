import React from 'react';
import './app.css';
import styles from '../styles.modules.css';

class App extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1> Environment: {__NODE_ENV__} </h1>
      </div>
    );
  }
}

export default App;
