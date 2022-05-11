import React, {useEffect, useState} from "react";

import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore/lite';
import {v4 as uuidv4} from "uuid";
import styles from "../../../styles/BirthdayListContainer.module.css";
import BirthdayList from "./BirthdayList";


function BirthdayListContainer(props){

    const [fetchedFriendsList, setFetchedFriendsList] = useState([]);

    useEffect(() => {
        getFriendsList();
    }, [props.count]);


    async function getFriendsList(){
        const friendsCollection = collection(db, 'friends');
        const friendsSnapshot = await getDocs(friendsCollection);
        setFetchedFriendsList(friendsSnapshot.docs.map(doc => doc.data()));
    }

    const friendsList = fetchedFriendsList.map(fetchedFriend => {
        return {...fetchedFriend, bdate: new Date(fetchedFriend.bdate)}
    });

    const currentMonth = new Date().toLocaleString("en-us", {month: "long"});

    const filteredFriendsList = friendsList.filter((friend) => {
        return friend.bdate.toLocaleString("en-us", {month: "long"}) === currentMonth;
    });

    return (
        <div className={styles.BirthdayListContainer}>
            <h2>Upcoming Birthdays</h2>
            <p>Here are your loved ones whose birthday is this month!</p>
            {
                filteredFriendsList.length !== 0 
                ?
                <div>
                    {
                        filteredFriendsList.map(friend => {
                            return <BirthdayList key={uuidv4()} friendData = {friend}/>
                        })
                    }
                </div>
                :
                <div className={styles.noBirthdays}>No Birthdays this month</div>
            }
        </div>
    )
}

export default BirthdayListContainer;