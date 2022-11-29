    import React, { useState, useEffect } from "react";
    import { useTranslation } from 'react-i18next';
    import { updateUser } from '../api/axios.js';
    import { useAuth } from '../context/AuthContext'
    import { Button } from 'react-bootstrap';
    import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import EmailChangeModal from "./modal/EmailChangeModal.js";
    import PasswordChangeModal from "./modal/PasswordChangeModal.js";
    import ImageSelectModal from "./modal/ImageSelectModal.js";

    const NAME_REGEX = /^[A-Z][A-z" "-]{3,49}$/;
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

    export default function EditProfileInfo(props) {
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

        const [image, setImage] = useState(props.user.image || "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-person-icon.png");

        const [showEmail, setShowEmail] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const [showImage, setShowImage] = useState(false);

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
                Login: login,
                Name: name,
                Image: image,
                PhoneNumber: phone,
                DateOfBirth: dateOfBirth
            }
            console.log(updatedUser);

            await updateUser(updatedUser).then((response) => {
                props.updateUser(updatedUser);
                props.updateMode(false);
                window.location.reload();
            })
    }

        const changeShowEmail = (bool) => {
            setShowEmail(bool);
        }

        const changeShowPwd = (bool) => {
            setShowPassword(bool);
        }

        const changeShowImage = (bool) => {
            setShowImage(bool);
        }

        const changeImage = (img) => {
            setImage(img);
        }

        return (
            <div className="profile edit">
                <div className="row">
                    <div className="avatarDiv">
                        <img src={image} width="105px" />
                        <Button className="imageBtn w-100" onClick={() => setShowImage(true)}>{i18n.t('ChangeImageBtn')}</Button>
                    </div>
                    <div className="btnContainer">
                        <p>{i18n.t('Additional Actions')}</p>
                        <Button className="emailBtn w-100" onClick={() => setShowEmail(true)}>{i18n.t('ChangeEmailBtn')}</Button>
                        <Button className="passwordBtn w-100" onClick={() => setShowPassword(true)}>{i18n.t('ChangePwdBtn')}</Button>
                    </div>
                </div>
                <div className="container">
                    <div className="profileNames w-100">
                        <label for="name">
                            {i18n.t('Name')}:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !name ? "hide" : "invalid"} />
                        </label><br />
                        <input
                            className="form-control text-center"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                        /><br />
                        <label for="login">
                            {i18n.t('Username')}:
                            <FontAwesomeIcon icon={faCheck} className={validLogin ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLogin || !login ? "hide" : "invalid"} />
                        </label><br />
                        <input
                            className="form-control  text-center"
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            aria-invalid={validLogin ? "false" : "true"}
                            aria-describedby="uidnote"
                        /><br />
                        <label for="phone">
                            {i18n.t('Phone')}:
                            <FontAwesomeIcon icon={faCheck} className={validPhone ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPhone || !phone ? "hide" : "invalid"} />
                        </label><br />
                        <input
                            className="form-control  text-center"
                            type="tel"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            aria-invalid={validPhone ? "false" : "true"}
                            aria-describedby="uidnote"
                        /><br />
                        <label for="dateOfBirth">
                            {i18n.t('Birth Date')}:
                            <FontAwesomeIcon icon={faCheck} className={validDateOfBirth ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validDateOfBirth || !dateOfBirth ? "hide" : "invalid"} />
                        </label><br />
                        <input
                            className="form-control  text-center"
                            type="date"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            aria-invalid={validDateOfBirth ? "false" : "true"}
                            aria-describedby="uidnote"
                        /><br />
                    </div>
                    <Button className="btn btn-success w-100" onClick={handleSubmit}>{i18n.t('Save')}</Button>

                </div>
                <br />

                <EmailChangeModal showEmail={showEmail} setShowEmail={changeShowEmail} />
                <PasswordChangeModal showPassword={showPassword} setShowPassword={changeShowPwd} />
                <ImageSelectModal setImage={changeImage} showImage={showImage} setShowImage={changeShowImage} />
            </div>
        );
    }