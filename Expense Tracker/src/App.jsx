import React from 'react';
import Navbar from './Components/Navbar';
import styles from './App.module.css';
import Card from './Components/Card';

const App = () => {
  return (
    <div className={styles.container}>
    <Navbar />
    <div className={styles.hero}>
      <Card />
      <Card />
    </div>
    </div>
  )
}

export default App