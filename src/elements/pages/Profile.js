import React, {useState} from "react";
import './Profile.css';
import FeedItem from "../../components/FeedItem";
import Feed from "../../components/Feed";

export default function Profile(){

    return(
        <div>
            <div className="profile">
                <div className="row">
                    <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png" width="105px"/> 
                    <div className="btnContainer"><button className="editBtn">Edit Profile</button></div>
                </div>
                <div className="profileNames">
                    <p>Name</p>
                    <p>Username</p>
                </div>
                <br />

            </div>
            <div className="feed">
                <Feed />
            </div>
        </div>
    );
}