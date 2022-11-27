import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import {
    NavLink,
    useNavigate,
} from "react-router-dom";
import DatePicker from "react-datepicker";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signUp } from "../../api/axios.js";

import './SignUpForm.css';
import "react-datepicker/dist/react-datepicker.css";

const NAME_REGEX = /^[A-Z][A-z" "-]{3,49}$/;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;
const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

function SignUpForm() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();

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
            const newUser = {
                Email: email,
                Name: name,
                Login: username,
                DateOfBirth: date,
                PhoneNumber: phone,
                Password: pwd,
                PasswordConfirm: matchPwd
            }
            const response = await signUp(newUser).then((response) => {
                console.log(response?.data);
                console.log(response?.accessToken);
                console.log(JSON.stringify(response))

                setUsername('');
                setName('');
                setEmail('');
                setPhone('');
                setDate('');
                setPwd('');
                setMatchPwd('');

                //sessionStorage.setItem('is-authorized', true);
                //setAuth(true);
                navigate('/sign_in');
            })
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
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "d-none"} aria-live="assertive">{errMsg}</p>
                    <h1>{i18n.t('Register')}</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            {i18n.t('Name')}
                        </label>
                        <input
                            className={"form-control text-center" + (name?(validName ? ' is-valid' : ' is-invalid'):'') }
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
                        <p id="uidnote" className={nameFocus && name && !validName ? "instructions" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('NameCharNumber')}.<br />
                            {i18n.t('NameFirstChar')}.<br />
                            {i18n.t('NameCharsAllowed')}.
                        </p>

                        <label htmlFor="username">
                            {i18n.t('Username')}
                        </label>
                        <input
                            className={"form-control text-center" + (username?(validUsername ? ' is-valid' : ' is-invalid'):'') }
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
                        <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('UsernameCharNumber')}.<br />
                            {i18n.t('UsernameFirstChar')}.<br />
                            {i18n.t('UsernameCharsAllowed')}.
                        </p>

                        <label htmlFor="email">
                            {i18n.t('Email')}
                        </label>
                        <input
                            className={"form-control text-center" + (email?(validEmail ? ' is-valid' : ' is-invalid'):'') }
                            type="text"
                            id="email"
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="uidnote"
                        />

                        <label htmlFor="date">
                            {i18n.t('Birth Date')}
                        </label>
                        <DatePicker className={"form-control text-center" + (date?(validDate ? ' is-valid' : ' is-invalid'):'') } id="date" selected={date} onChange={(date) => setDate(date)}
                            aria-invalid={validDate ? "false" : "true"}
                            aria-describedby="uidnote" />

                        <label htmlFor="phone">
                            {i18n.t('Phone')}
                        </label>
                        <input
                            className={"form-control text-center" + (phone?(validPhone ? ' is-valid' : ' is-invalid'):'') }
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
                            {i18n.t('Password')}
                        </label>
                        <input
                            className={"form-control text-center" + (pwd?(validPwd ? ' is-valid' : ' is-invalid'):'') }
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
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('PasswordCharNumber')}.<br />
                            {i18n.t('PasswordRequiredChars')}.<br />
                            {i18n.t('PasswordSpecialCharacters')}: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span> <span aria-label="upper case">_</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            {i18n.t('Confirm Password')}
                        </label>
                        <input
                            className={"form-control text-center" + (matchPwd?(validMatch && validPwd ? ' is-valid' : ' is-invalid'):'') }
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
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "d-none"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            {i18n.t('ConfirmPasswordException')}
                        </p>

                        <button className="btn btn-secondary" disabled={!validUsername || !validName || !validEmail || !validDate || !validPwd || !validMatch ? true : false}>{i18n.t('Sign Up')}</button>
                    </form>
                    <p>
                        {i18n.t('Already registered?')}<br />
                        <span className="line">
                            <NavLink to='/sign_in'>{i18n.t('Sign In')}</NavLink>
                        </span>
                    </p>
                </section>
            </>
        </div>
    );
}

export default SignUpForm;