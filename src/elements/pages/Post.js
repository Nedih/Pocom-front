import "./Post.css"
import { useParams } from "react-router-dom";
import PostContent from '../../components/PostContent';

export default function Profile() {
    const { postId } = useParams();
    return (
        <PostContent id={postId} />
    )
}