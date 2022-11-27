import "./Post.css"
import { useParams } from "react-router-dom";
import PostContent from '../../components/PostContent';

export default function Post() {
    const { postId } = useParams();
    return (
        <PostContent id={postId} />
    )
}