import React, {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import axios from "../../api/axios";
import {useAuth} from '../../context/AuthContext'
import { Button,Modal } from 'react-bootstrap';  
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PUT_EMAIL_URL = '/api/user/email';

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
        const updatedEmail = {
            email: email
        }

        const token = auth.token;
        await axios.put(PUT_EMAIL_URL, JSON.stringify(updatedEmail),
            {
                headers: { 'Authorization': `Bearer ${token}`,
                    "access-control-allow-origin" : "*",
                    'Content-Type': 'application/json'  },
                withCredentials: true
            }
        ).then((response) => {
            if(response.status == 200)
                props.setShowEmail(false);
        })
    }

    return(
        <Modal show={props.showEmail}>  
            <Modal.Header closeButton>{i18n.t('Change Email')}</Modal.Header>  
            <Modal.Body>
                <label for="email">
                    {i18n.t('New Email')}:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label><br/>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </Modal.Body>  
            <Modal.Footer>  
                <Button onClick={()=>props.setShowEmail(false)}>{i18n.t('Close')}</Button>  
                <Button onClick={emailEdit}>{i18n.t('Save')}</Button>  
            </Modal.Footer>  
        </Modal>  
    );
}