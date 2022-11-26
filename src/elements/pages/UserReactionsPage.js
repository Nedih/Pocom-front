import React, {useState, useEffect} from "react";
import { userReactions } from '../../api/axios.js';
import {useAuth} from '../../context/AuthContext'

export default function UserReactionsPage(){
    const { auth } = useAuth();

    const [reactions, setReactions] = useState([{}]);

     useEffect(() => {
        getUserReactions();
      }, []);

    async function getUserReactions(){
        await userReactions().then((response) => {
            console.log(JSON.stringify(response.data));
            setReactions(response.data);
        })
    }

    return(
        <div> 
            <div className="reactions">
                {reactions.map(reaction => (
                    <div key={reaction.id}>
                        <p>{reaction.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}