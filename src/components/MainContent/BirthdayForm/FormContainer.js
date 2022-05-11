import React from "react";

import BirthdayForm from "./BirthdayForm";

import styles from "../../../styles/FormContainer.module.css";

function FormContainer(props){
    return (
        <div className={styles.FormContainer}>
            <h2>Made New Friends?</h2>
            <p>Add their birthdays so that you don't miss their birthdays out!</p>
            <BirthdayForm updateCount = {props.updateCount}/>
        </div>
    )
}

export default FormContainer;