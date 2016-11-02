import React from 'react';
import styles from './styles.modules.css';
import 'font-awesome/css/font-awesome.css'

class App extends React.Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>
          <i className="fa fa-star"></i>
          Environment: {__NODE_ENV__}</h1>
      </div>
    );
  }
}

export default App;
