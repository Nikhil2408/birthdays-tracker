import React, {useState} from "react";

import styles from '../styles/App.module.css';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';


function App() {

  const [count, setCount] = useState(0);

  function updateCount(){
    setCount((currentState) => {
      return ++currentState;
    })
  }

  return (
    <div className={styles.App}>
        <Header />
        <MainContent count = {count} updateCount = {updateCount}/>
    </div>
  );
}

export default App;
