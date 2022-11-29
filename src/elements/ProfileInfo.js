import React from "react";

export default function ProfileInfo(props){

    const handleClick = () => {
        props.updateMode(true)
    }

    return(
        <div className="profile">
            <div className="myRow">
                <img style={{'borderRadius':'50%'}} src={props.user.image || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png"} width="105px" height='105px'/> 
                <div className="profileNames">
                <p>Name: {props.user.name}</p>
                <p>Username: {props.user.login}</p>
            </div>
                <div className="btnContainer">
                    <button className="btn btn-secondary" onClick={handleClick}>Edit Profile</button>
                </div>
            </div>
            <br />
        </div>
    );
}