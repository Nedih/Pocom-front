import React, {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
//import './ProfileInfo.css';
import axios from '../api/axios.js';
import {useAuth} from '../context/AuthContext'
import { Button } from 'react-bootstrap';  
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EmailChangeModal from "./modal/EmailChangeModal.js";
import PasswordChangeModal from "./modal/PasswordChangeModal.js";

const PUT_PROFILE_URL = '/api/user/profile';

const NAME_REGEX = /^[A-Z][A-z" "-]{3,49}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PHONE_REGEX  = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export default function EditProfileInfo(props){
    const { i18n } = useTranslation();
    const { auth } = useAuth();

    const [login, setLogin] = useState(props.user.login);
    const [validLogin, setValidLogin] = useState(false);

    const [name, setName] = useState(props.user.name);
    const [validName, setValidName] = useState(false);

    const [phone, setPhone] = useState(props.user.phoneNumber);
    const [validPhone, setValidPhone] = useState(false);

    const [dateOfBirth, setDateOfBirth] = useState(props.user.dateOfBirth); 
    const [validDateOfBirth, setValidDateOfBirth] = useState(false);

    const [showEmail, setShowEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        setValidLogin(USER_REGEX.test(login));
    }, [login])
  
    useEffect(() => {
      setValidName(NAME_REGEX.test(name));
    }, [name])
  
    useEffect(() => {
      console.log((new Date().getFullYear()) - new Date(dateOfBirth).getFullYear());
      setValidDateOfBirth((new Date().getFullYear()) - new Date(dateOfBirth).getFullYear() >= 14);
    }, [dateOfBirth])
  
    useEffect(() => {
      setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

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

    const changeShowEmail = (bool) => {
        setShowEmail(bool);
    }

    const changeShowPwd = (bool) => {
        setShowPassword(bool);
    }

    return(
        <div className="profile edit">
            <div className="row">
                <img src="https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png" width="105px"/> 
                <div className="btnContainer">
                    <Button className="emailBtn" onClick={() => setShowEmail(true)}>{i18n.t('ChangeEmailBtn')}</Button>
                    <Button className="passwordBtn" onClick={() => setShowPassword(true)}>{i18n.t('ChangePwdBtn')}</Button>
                    <button className="editBtn" onClick={handleSubmit}>{i18n.t('Save')}</button>
                </div>
            </div>
            <div className="profileNames">
                <p>Name: {props.user.name}</p>
                <p>Username: {props.user.login}</p>
                <label for="name">
                    {i18n.t('Name')}:
                    <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                </label><br/>
                <input 
                    type="text"
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                /><br/>
                <label for="login">
                    {i18n.t('Username')}:
                    <FontAwesomeIcon icon={faCheck} className={validLogin ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validLogin || !login ? "hide" : "invalid"} />
                </label><br/>
                <input 
                    type="text" 
                    id="login" 
                    value={login} 
                    onChange={(e) => setLogin(e.target.value)}
                    aria-invalid={validLogin ? "false" : "true"}
                    aria-describedby="uidnote"
                /><br/> 
                <label for="phone">
                    {i18n.t('Phone')}:
                    <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                </label><br/>           
                <input 
                    type="tel" 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={validPhone ? "false" : "true"}
                    aria-describedby="uidnote"
                /><br/>
                <label for="dateOfBirth">
                    {i18n.t('Birth Date')}:
                    <FontAwesomeIcon icon={faCheck} className={validDateOfBirth ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validDateOfBirth || !dateOfBirth ? "hide" : "invalid"} />
                </label><br/>
                <input 
                    type="date" 
                    id="dateOfBirth" 
                    value={dateOfBirth} 
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    aria-invalid={validDateOfBirth ? "false" : "true"}
                    aria-describedby="uidnote"
                /><br/>
            </div>
            <br />
            <EmailChangeModal showEmail={showEmail} setShowEmail={changeShowEmail} />
            <PasswordChangeModal showPassword={showPassword} setShowPassword={changeShowPwd} />  
        </div>
    );
}