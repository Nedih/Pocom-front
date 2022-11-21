import React, {useState, useEffect} from "react";
//import './ProfileInfo.css';

export default function EditProfileInfo(props){
    const [login, setLogin] = useState("login");
    const [email, setEmail] = useState("email");
    const [name, setName] = useState("name");
    const [phone, setPhone] = useState("phone");
    const [dateOfBirth, setDateOfBirth] = useState("dateOfBirth");

    const handleSubmit = (user) => {
        const updatedUser = {
            login: login, 
            email: email,
            name: name,
            phone: phone,
            dateOfBirth: dateOfBirth
        }

        props.updateUser(updatedUser);
        props.updateMode(false);
    }

    return(
        <div className="profile edit">
            <div className="row">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png" width="105px"/> 
                <div className="btnContainer">
                    <button className="editBtn" onClick={handleSubmit}>Save Changes</button>
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