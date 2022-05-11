import React, {useState} from "react";

import styles from "../../../styles/BirthdayList.module.css";

function BirthdayList(props){

    const [wished, setWished] = useState(false);

    const currentYear = new Date().getFullYear();

    const {bdate} = props.friendData;
    const year = bdate.getFullYear();
    const month = bdate.toLocaleString("en-us", {month: "long"});
    const date = bdate.getDate();

    function clickHandler(){
        setWished(!wished);
    }

    const classes = wished ?  styles.wished : "";

    return(
        <div className = {`${classes} ${styles.BirthdayList}`}>
            <div>
                <h2>{props.friendData.name}</h2>
                <h4>{date} {month}, {year}</h4>
                <p>Turning {currentYear - year} years old</p>
            </div>
            <button onClick = {clickHandler}>Wished?</button>
        </div>
    )
}

export default BirthdayList;