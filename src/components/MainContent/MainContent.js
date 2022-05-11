import React from "react";

import FormContainer from "./BirthdayForm/FormContainer";

import styles from "../../styles/MainContent.module.css";
import BirthdayListContainer from "./BirthdaysList/BirthdaysListContainer";

function MainContent(props){
    return (
        <div className={styles.MainContent}>
            <FormContainer updateCount = {props.updateCount}/>
            <BirthdayListContainer count = {props.count}/>
        </div>
    )
}

export default MainContent;