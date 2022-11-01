import { useContext, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import DataContext from '../context/DataContext';

const CommentInput = () => {
    //댓글값을 입력받을 공간
    const {id} = useParams();
    const [textInput, setTextInput] = useState("");
    //저장을 위해 context에 만든 내용들을 불러옴 (데이터 안의 액션과 스테이트를 따로 들고올 수 있다)
    const {action, state} = useContext(DataContext);
    
    const addComment =()=> {
        //1 새로운 comment객체를 생성
        const comment = 
            {
                commentId : state.commentCount, //계속 증가해야하는 값
                productId : id, // 현재id값 > :param값 또는 부모에게 받은값
                name : (state.user ? state.user.name : "<익명>"), //user에게 받아옴 (단, user값이 null이면 빈값)
                text : textInput 
            }
        //2 생성한 코멘트객체를 state의 allComments에 연결해서 새 값 지정
        action.setAllComments(state.allComments.concat(comment));
        console.log(state.allComments);
        action.setCommentCount(state.commentCount+1);
    }

    return ( 
        <div>

        <Container>
            <Row>
                <Col xs={10} >
                    <FloatingLabel 
                    controlId="floatingTextarea"
                    label="Comments"
                    className="mb-3">
                    <Form.Control as="textarea" placeholder="Leave a comment here"
                    onChange={(e)=>{setTextInput(e.target.value)}}
                    />
                    </FloatingLabel>
                </Col>
                <Col xs={2} className="d-grid gap-2">
                    {/* onClick은 길어질 예정이라 위에 따로 함수로 뻄 */}
                    <Button variant='primary'onClick={addComment}>입력</Button>
                </Col>
            </Row>
        </Container>


        </div>
    );
}

export default CommentInput;