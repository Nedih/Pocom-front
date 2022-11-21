import React, {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
//import './ProfileInfo.css';
import axios from '../api/axios.js';
import {useAuth} from '../context/AuthContext'
import { Button,Modal } from 'react-bootstrap';  

const PUT_PROFILE_URL = '/api/user/profile';
const PUT_EMAIL_URL = '/api/user/email';
const PUT_PASSWORD_URL = '/api/user/password';

export default function EditProfileInfo(props){
    const { i18n } = useTranslation();
    const { auth } = useAuth();

    const [login, setLogin] = useState(props.user.login);
    const [name, setName] = useState(props.user.name);
    const [phone, setPhone] = useState(props.user.phoneNumber);
    const [dateOfBirth, setDateOfBirth] = useState(props.user.dateOfBirth); 
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async () => {
        const updatedUser = {
            login: login, 
            name: name,
            phoneNumber: phone,
            dateOfBirth: dateOfBirth
        }

        const token = auth.token;
        await axios.put(PUT_PROFILE_URL, JSON.stringify(updatedUser),
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
        ).then((response) => {
            props.updateUser(updatedUser);
            props.updateMode(false);
        })
    }

    const emailEdit = async () => {
        const updatedEmail = {
            email: email
        }

        const token = auth.token;
        /*await axios.put(PUT_EMAIL_URL, JSON.stringify(updatedEmail),
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
        ).then((response) => {
            if(response.status == 200)
                setShowEmail(false);
        })*/
        setShowEmail(false);
    }

    const passwordChange = async () => {
        const updatedPassword = {
            currentPassword: currentPassword, 
            newPassword: newPassword
        }

        const token = auth.token;
        /*await axios.put(PUT_PASSWORD_URL, JSON.stringify(updatedPassword),
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
        ).then((response) => {
            if(response.status == 200)
                setShowPassword(false);
        })*/
        setShowPassword(false);
    }

    return(
        <div className="profile edit">
            <div className="row">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png" width="105px"/> 
                <div className="btnContainer">
                    <Button className="emailBtn" onClick={() => setShowEmail(true)}>Change Email</Button>
                    <Button className="passwordBtn" onClick={() => setShowEmail(true)}>Change Password</Button>
                    <button className="editBtn" onClick={handleSubmit}>Save Changes</button>
                </div>
            </div>
            <div className="profileNames">
                <p>Name: {props.user.name}</p>
                <p>Username: {props.user.login}</p>
                <label for="name">{i18n.t('Name')}:</label><br/>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
                <label for="login">{i18n.t('Username')}:</label><br/>
                <input type="text" id="login" value={login} onChange={(e) => setLogin(e.target.value)}/><br/> 
                <label for="phone">{i18n.t('Phone')}:</label><br/>           
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/><br/>
                <label for="dateOfBirth">{i18n.t('Birth Date')}:</label><br/>
                <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/><br/>
            </div>
            <br />
            <Modal show={showEmail}>  
                <Modal.Header closeButton>Email</Modal.Header>  
                <Modal.Body>
                    This is a Modal Body<br/>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Modal.Body>  
                <Modal.Footer>  
                    <Button onClick={()=>setShowEmail(false)}>Close</Button>  
                    <Button onClick={emailEdit}>Save</Button>  
                </Modal.Footer>  
            </Modal>  
            <Modal show={showPassword}>  
                <Modal.Header closeButton>Password</Modal.Header>  
                <Modal.Body>
                    This is a Modal Body<br/>
                    <label for="curPwd">{i18n.t('Current Password')}:</label><br/>
                    <input type="password" id="curPwd" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}/><br/>
                    <label for="newPwd">{i18n.t('New Password')}:</label><br/>
                    <input type="password" id="newPwd" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/><br/>
                </Modal.Body>  
                <Modal.Footer>  
                    <Button onClick={()=>setShowPassword(false)}>Close</Button>  
                    <Button onClick={passwordChange}>Save</Button>  
                </Modal.Footer>  
            </Modal>  
        </div>
    );
}