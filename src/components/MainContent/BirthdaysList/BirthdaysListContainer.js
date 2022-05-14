import React, {useEffect, useState} from "react";

import { db } from "../../firebase";
import { collection, getDocs } from 'firebase/firestore/lite';
import {v4 as uuidv4} from "uuid";
import styles from "../../../styles/BirthdayListContainer.module.css";
import BirthdayList from "./BirthdayList";
import party from "../../../assets/party.png";


function BirthdayListContainer(props){

    const [fetchedFriendsList, setFetchedFriendsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getFriendsList();
    }, [props.count]);


    async function getFriendsList(){
        setIsLoading(true);
        const friendsCollection = collection(db, 'friends');
        const friendsSnapshot = await getDocs(friendsCollection);
        setFetchedFriendsList(friendsSnapshot.docs.map(doc => doc.data()));
        setIsLoading(false);
    }

    const friendsList = fetchedFriendsList.map(fetchedFriend => {
        return {...fetchedFriend, bdate: new Date(fetchedFriend.bdate)}
    });

    const currentMonth = new Date().toLocaleString("en-us", {month: "long"});

    let filteredFriendsList = friendsList.filter((friend) => {
        return friend.bdate.toLocaleString("en-us", {month: "long"}) === currentMonth;
    });


    return (
        <div className={styles.BirthdayListContainer}>
            <h2>Upcoming Birthdays</h2>
            <p>Here are your loved ones whose birthday is this month! <img alt="party-emoji" src={party} /></p>
            {!isLoading && filteredFriendsList.length === 0 && <div className={styles.noBirthdays}>No Birthdays this month</div>}
            {!isLoading && filteredFriendsList.length > 0 &&
                <div>
                    {
                        filteredFriendsList.map(friend => {
                            return <BirthdayList key={uuidv4()} friendData = {friend}/>
                        })
                    }
                </div>
            }
            {isLoading && <p>Loading Data...</p>}
        </div>
    )
}

export default BirthdayListContainer;