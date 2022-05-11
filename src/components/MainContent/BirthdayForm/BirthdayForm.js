import React, {useEffect, useState} from "react";
import { db } from "../../firebase";
import { collection, addDoc } from 'firebase/firestore/lite';
import styles from "../../../styles/BirthdayForm.module.css";


function BirthdayForm(props){

    const [formInput, setFormInput] = useState({
        name: "",
        bdate: ""
    });

    const [nameInputValid, setNameInputValid] = useState(false);
    const [dateInputValid, setDateInputValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        setFormValid(nameInputValid && dateInputValid)
    }, [nameInputValid, dateInputValid]);


    function nameChangeHandler(eventObj){
        if(eventObj.target.value.length > 0){
            setNameInputValid(true);
        }
        else{
            setNameInputValid(false);
        }
        setFormInput(function(currentState){
            return {
                ...currentState,
                name: eventObj.target.value
            }
        })
    }

    function dateChangeHandler(eventObj){
        if(eventObj.target.value !== ""){
            setDateInputValid(true);
        }
        else{
            setDateInputValid(false);
        }
        setFormInput(function(currentState){
            return {
                ...currentState,
                bdate: eventObj.target.value
            }
        })
    }

    async function submitHandler(eventObj){
        eventObj.preventDefault();

        try {
            await addDoc(collection(db, "friends"), {
              name: formInput.name,
              bdate: formInput.bdate
            });
        }
        catch (e) {
            console.error("Error while adding the document: ", e);
        }

        props.updateCount();
        setFormInput({
            name: "",
            bdate: ""
        });
        setNameInputValid(false);
        setDateInputValid(false);
    }

    return (
        <form onSubmit={submitHandler} className={styles.BirthdayForm}>
            <label htmlFor="name">Name: </label>
            <input 
                className = {nameInputValid ? "" : styles.invalid} 
                type="text"
                id="name"
                name="name"
                placeholder = "Enter the name"
                value = {formInput.name}
                onChange = {nameChangeHandler}/>
            <label htmlFor="bdate">Birthday Date:</label>
            <input
                className = {dateInputValid ? "" : styles.invalid}
                type="date"
                id="bdate"
                name="bdate"
                placeholder="Enter Birth Date"
                value = {formInput.bdate}
                onChange = {dateChangeHandler}/>
            {
                formValid ?
                <button>Add Birthday</button>
                :
                <button className = {formValid ? "" : styles.invalid} disabled>Add Birthday</button>
            }
        </form>
    )
}

export default BirthdayForm;