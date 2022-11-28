import React from "react";

export default function ProfileInfo(props){

    const handleClick = () => {
        props.updateMode(true)
    }

    return(
        <div className="profile">
            <div className="row">
                <img src={props.user.image || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png"}/> 
                <div className="btnContainer">
                    <button className="editBtn" onClick={handleClick}>Edit Profile</button>
                </div>
            </div>
            <div className="profileNames">
                <p>Name: {props.user.name}</p>
                <p>Username: {props.user.login}</p>
            </div>
            <br />
        </div>
    );
}