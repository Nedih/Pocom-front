import React, {useState, useEffect, useRef} from "react";
import { useTranslation } from 'react-i18next';
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import {useAuth} from '../AuthContext.js'
import DatePicker from "react-datepicker";
import PhoneInput from 'react-phone-number-input'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios.js";

import './SignUpForm.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'

const NAME_REGEX = /^[A-Z][A-z" "-]{3,49}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const PHONE_REGEX  = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const REGISTER_URL = '/register';

function SignUpForm() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { setAuth} = useAuth();
  
  const usernameRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [name, setName] = useState('');
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const [date, setDate] = useState(new Date());
  const [validDate, setValidDate] = useState(false);
  //const [nameFocus, setNameFocus] = useState(false);

  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
      usernameRef.current.focus();
  }, [])

  useEffect(() => {
      setValidUsername(USER_REGEX.test(username));
  }, [username])

  useEffect(() => {
    setValidName(NAME_REGEX.test(name));
  }, [name])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
    console.log((new Date().getFullYear()) - date.getFullYear());
    setValidDate((new Date().getFullYear()) - date.getFullYear() >= 14);
  }, [date])

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [name, username, email, phone, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = NAME_REGEX.test(name);
    const v4 = PHONE_REGEX.test(phone);
    const v5 = EMAIL_REGEX.test(email);
    const v6 = (new Date().getFullYear()) - date.getFullYear() >= 14;
    if (!v1 || !v2 || !v3 || !v4 || !v5 || !v6) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
        /*const response = await axios.post(REGISTER_URL,
            JSON.stringify({ name, username, pwd }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        console.log(response?.data);
        console.log(response?.accessToken);
        console.log(JSON.stringify(response))*/
        setSuccess(true);

        setUsername('');
        setName('');
        setEmail('');
        setPhone('');
        setDate('');
        setPwd('');
        setMatchPwd('');

        sessionStorage.setItem('is-authorized', true);
        setAuth(true);
        navigate('/feed');
    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        } else if (err.response?.status === 409) {
            setErrMsg('Username Taken');
        } else {
            setErrMsg('Registration Failed')
        }
        errRef.current.focus();
    }
}

  return (
    <div className="SignUpForm">
      <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>{i18n.t('Register')}</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            {i18n.t('Name')}:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="name"
                            //ref={nameRef}
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />
                        <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('NameCharNumber')}.<br />
                            {i18n.t('NameFirstChar')}.<br />
                            {i18n.t('NameCharsAllowed')}.
                        </p>

                        <label htmlFor="username">
                            {i18n.t('Username')}:
                            <FontAwesomeIcon icon={faCheck} className={validUsername ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validUsername || !username ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={usernameRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={validUsername ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUsernameFocus(true)}
                            onBlur={() => setUsernameFocus(false)}
                        />
                        <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('UsernameCharNumber')}.<br />
                            {i18n.t('UsernameFirstChar')}.<br />
                            {i18n.t('UsernameCharsAllowed')}.
                        </p>

                        <label htmlFor="email">
                            {i18n.t('Email')}:
                            <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                            //onFocus={() => setEmailFocus(true)}
                            //onBlur={() => setEmailFocus(false)}
                        />

                        <label htmlFor="date">
                            {i18n.t('Birth Date')}:
                            <FontAwesomeIcon icon={faCheck} className={validDate ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validDate || !date ? "hide" : "invalid"} />
                        </label>
                        <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} 
                          aria-invalid={validDate ? "false" : "true"}
                          aria-describedby="uidnote"/>
                        
                        <label htmlFor="phone">
                            {i18n.t('Phone')}:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="phone"
                            autoComplete="off"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            required
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setPhoneFocus(true)}
                            onBlur={() => setPhoneFocus(false)}
                        />

                        <label htmlFor="password">
                            {i18n.t('Password')}:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('PasswordCharNumber')}.<br />
                            {i18n.t('PasswordRequiredChars')}.<br />
                            {i18n.t('PasswordSpecialCharacters')}: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="upper case">_</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            {i18n.t('Confirm Password')}:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('ConfirmPasswordException')}
                        </p>

                        <button disabled={!validUsername || !validName || !validEmail || !validDate || !validPwd || !validMatch ? true : false}>{i18n.t('Sign Up')}</button>
                    </form>
                    <p>
                        {i18n.t('Already registered?')}<br />
                        <span className="line">
                        <NavLink to='/sign_in'>{i18n.t('Sign In')}</NavLink>
                        </span>
                    </p>
                </section>
            )}
        </>
    </div>
  );
}

export default SignUpForm;