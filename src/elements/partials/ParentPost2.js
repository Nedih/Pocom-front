import React, {useState, useEffect} from "react";
import Moment from 'moment';
import { getPost } from "../../api/axios";

export default function ParentPost2(props){
    const [image, setImage] = useState(true);
    const [post, setPost] = useState({});

    useEffect(() => {
        getPost(props.id)
            .then((response) => {
                setPost(response?.data);
            }
        );
    }, [])

    useEffect(() => {
        if (post.authorImage !== undefined) {
            setImage(<img className='user_image parent' alt="img" src={post.authorImage} />);
        }
        else {
            setImage(<img className='user_image parent' alt="img" src='https://webcolours.ca/wp-content/uploads/2020/10/webcolours-unknown.png' />);
        }
    }, [image])

    return(
        <>
            <div key={post.id} className='parent_item' style={{ 'textAlign': 'left', 'verticalAlign': 'center' }} onClick={(e) => window.location.assign(`/post/${post.id}`)}>
                    {image}
                    <div className='w-100'>
                        <div className='d-flex flex-row'>
                            <div className='user_label justify-content-center align-self-center'>{post.authorName}</div>
                            <div className='px-1 justify-content-center align-self-center'>@{post.authorLogin}</div>
                            <div className='justify-content-center align-self-center'>·</div>
                            <div className='px-1 mt-0 postDate justify-content-center align-self-center' >{Moment(post.creationDate).format("MMM DD ' YY")}</div>
                        </div>                       
                    <div>
                        <p >{post.text}</p>
                    </div>
                    </div>
            </div>
        </>
    );
}