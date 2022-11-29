import React, {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { updateUserPassword } from "../../api/axios";
import {useAuth} from '../../context/AuthContext'
import { Button,Modal } from 'react-bootstrap';  
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%_]).{8,24}$/;

export default function PasswordChangeModal(props){
    const { i18n } = useTranslation();
    const { auth } = useAuth();

    const [errMsg, setErrMsg] = useState('');

    const [curPwd, setCurPwd] = useState("");
    const [validCurPwd, setValidCurPwd] = useState(false);

    const [newPwd, setNewPwd] = useState("");
    const [validNewPwd, setValidNewPwd] = useState(false);
    
    useEffect(() => {
      setValidCurPwd(PWD_REGEX.test(curPwd));
      setErrMsg('');
    }, [curPwd])

    useEffect(() => {
        setValidNewPwd(PWD_REGEX.test(newPwd));
        setErrMsg('');
    }, [newPwd])

    useEffect(() => {
        if(curPwd == newPwd && curPwd != ''){
            setValidNewPwd(curPwd != newPwd);
            setErrMsg("New password can't be equal to the current one");
        }
    }, [curPwd, newPwd])

    const passwordChange = async () => {
        const updatedPassword = {
            curPwd: curPwd, 
            newPwd: newPwd
        }

        const token = auth.token;
        await updateUserPassword(JSON.stringify(updatedPassword)).then((response) => {
            if(response.status == 200)
                props.setShowPassword(false);
        })
    }

    return(
        <Modal show={props.showPassword}>  
            <Modal.Header closeButton>{i18n.t('Change Password')}</Modal.Header>  
            <Modal.Body>
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <label for="curPwd">
                    {i18n.t('Current Password')}:
                    <FontAwesomeIcon icon={faCheck} className={validCurPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validCurPwd || !curPwd ? "hide" : "invalid"} />
                </label><br/>
                <input type="password" id="curPwd" value={curPwd} onChange={(e) => setCurPwd(e.target.value)}/>
                <label for="newPwd">
                    {i18n.t('New Password')}:
                    <FontAwesomeIcon icon={faCheck} className={validNewPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validNewPwd || !newPwd ? "hide" : "invalid"} />
                </label><br/>
                <input type="password" id="newPwd" value={newPwd} onChange={(e) => setNewPwd(e.target.value)}/>
            </Modal.Body>  
            <Modal.Footer>  
                <Button onClick={()=>props.setShowPassword(false)}>{i18n.t('Close')}</Button>  
                <Button onClick={passwordChange}>{i18n.t('Save')}</Button>  
            </Modal.Footer>  
        </Modal>  
    );
}