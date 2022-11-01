import { ListGroup } from "react-bootstrap";
const Comment = (props) => {
    const {comment} = props;
    return ( 
        <div>
            <ListGroup.Item>
                <h5>{comment.name}</h5>
                <p>{comment.text}</p>
            </ListGroup.Item>
        </div>
    );
}

export default Comment;