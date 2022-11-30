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
                    <div className='container mt-0 p-0' key={user.login} onClick={() => window.location.assign(`/profile/${user.login}`)}>
                        <div className='post m-5'>
                            <div>
                                <div className='header'>
                                    <img className='avatar' alt='img' src={user.image} />
                                    <div className='post_panel inner'>
                                        <div className='d-flex flex-row'>
                                            <div className='user_label'>{user.name}</div>
                                            <div className='px-1'>@{user.login}</div>
                                        </div>   
                                        <span className='options'>
                                            <button className="btn btn-primary">Subscribe</button>
                                        </span>                                 
                                    </div>
                                </div>
                            </div>
                            <div className='content'>
                                <div className='text'></div>                   
                            </div>
                        </div>                 
                    </div>
                ))}
            </div>
        </div>
    );
}