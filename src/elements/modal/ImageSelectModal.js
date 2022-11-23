import React, {useState} from "react";
import { Button,Modal } from 'react-bootstrap';  
import Avatar from 'react-avatar-edit';
import { useTranslation } from 'react-i18next';

export default function ImageSelectModal(props){
    const [preview, setPreview] = useState(null);
    const { i18n } = useTranslation();
    const [errMsg, setErrMsg] = useState('');

    const handleSubmit = () => {
        props.setImage(preview);
        props.setShowImage(false);
    }

    function onClose() {
        setPreview(null);
    }
    function onCrop(pv) {
        setPreview(pv);
    }
    function onBeforeFileLoad(elem) {
        setErrMsg('');
        if (elem.target.files[0].size > 4000000) {
            setErrMsg("Maximum file is 4MB");
            elem.target.value = "";
        }
    }
    return (
        <Modal show={props.showImage}>  
        <Modal.Header closeButton>{i18n.t('Change Avatar')}</Modal.Header>  
        <Modal.Body>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div>
            <Avatar
                width={600}
                height={300}
                onCrop={onCrop}
                onClose={onClose}
                onBeforeFileLoad={onBeforeFileLoad}
                src={null}
            />
            <br/>
            {preview && (
                <>
                <img src={preview} alt="Preview" />
                </>
            )}
        </div>
        </Modal.Body>  
        <Modal.Footer>  
            <Button onClick={()=>props.setShowImage(false)}>{i18n.t('Close')}</Button>  
            <Button onClick={handleSubmit}>{i18n.t('Save')}</Button>  
        </Modal.Footer>  
    </Modal>   
    );
}