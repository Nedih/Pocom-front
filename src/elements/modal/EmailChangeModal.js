import React, {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { refreshTokens, updateUserEmail } from "../../api/axios";
import {useAuth} from '../../context/AuthContext'
import { Button,Modal } from 'react-bootstrap';  
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export default function EmailChangeModal(props){
    const { i18n } = useTranslation();
    const { auth } = useAuth();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    
    useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    const emailEdit = async () => {
        const token = auth.token;
        await updateUserEmail(email).then(async (response) => {
            if(response.status == 200){
                await refreshTokens();
                props.setShowEmail(false);               
            }   
        })
    }

    return(
        <Modal show={props.showEmail}>  
            <Modal.Header style={{'backgroundColor':'#313131','border': '1px solid #525252'}}>{i18n.t('Change Email')}</Modal.Header>  
            <Modal.Body style={{'backgroundColor':'#414141'}}>
                <label for="email">
                    {i18n.t('New Email')}:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label><br/>
                <input className="form-control dark" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Modal.Body>  
            <Modal.Footer style={{'backgroundColor':'#313131','border': '1px solid #525252'}}>  
                <Button variant="secondary" onClick={()=>props.setShowEmail(false)}>{i18n.t('Close')}</Button>  
                <Button onClick={emailEdit}>{i18n.t('Save')}</Button>  
            </Modal.Footer>  
        </Modal>  
    );
}