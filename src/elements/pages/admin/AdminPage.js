import React, {useState, useEffect} from "react";
import { allPosts } from '../../../api/axios.js';
import {useAuth} from '../../../context/AuthContext'

export default function AdminPage(){
    const { auth } = useAuth();

    const [posts, setPosts] = useState([{}]);

    useEffect(() => {
        //getPosts();
      }, []);

    async function getPosts(){
        const token = auth.token;
        allPosts(token).then((response) => {
            console.log(JSON.stringify(response.data));
            setPosts(response.data);
        })
    }

    return(
        <div> 
            <p>Admin Panel</p>
        </div>
    );
}