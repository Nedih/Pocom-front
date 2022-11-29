import React, { useState, useEffect } from "react";
import { getUsers } from '../../api/axios.js';
import { useAuth } from '../../context/AuthContext'

export default function UserListPage() {
    const { auth } = useAuth();

    const [users, setUsers] = useState([{}]);

    useEffect(() => {
        const controller = new AbortController();
        getUserList(controller.signal);

        return () => {
            console.log("ABORT!!!")
            controller.abort();
        };
    }, []);

    async function getUserList(signal) {
        await getUsers(signal).then((response) => {
            console.log(JSON.stringify(response.data));
            setUsers(response.data);
        })
    }

    return (
        <div>
            <div className="feed">
                {users.map(user => (
                    <div key={user.login}>
                        <p>{user.login}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}