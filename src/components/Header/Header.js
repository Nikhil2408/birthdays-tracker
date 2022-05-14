import React from "react";

import styles from "../../styles/Header.module.css";

function Header(){
    return (
        <div className = {styles.Header}>
            <h1>Birthdays Tracker</h1>
            <p>One place to keep track of the birthdays of my closed ones</p>
        </div>
    )
}

export default Header;