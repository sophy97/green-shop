import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileUpModal from "../components/ProfileUpModal";
import DataContext from "../context/DataContext";

const Profile = () => {
    //데이터 가져오자 state로 (context)
    const {state} = useContext(DataContext);
    return ( 
        <div>
            <Container>
                <Row>
                    <Col>
                        {/* 칼럼1 > 프로필사진(o/x), 사진 수정 모달창 */}
                        {
                            state.user.profile ?
                            <div style={ {width:'200px', height:'200px', borderRadius:'50%',
                            backgroundImage:`url(${state.user.profile})`, backgroundSize:'cover'}
                            }></div>
                            : 
                            <div style={{width:'150px', height:'150px', 
                            backgroundColor:'lightgray', borderRadius:'50%'}}></div>
                        }
                        <ProfileUpModal />
                    </Col>
                    <Col>
                        {/* 칼럼2 > 이름, 찜 목록 출력 */}
                        <h2>{state.user.name}님</h2>
                        <hr />
                        <h3>찜 목록</h3>
                        <ul>
                            {
                                state.user.likelist.map((like)=>(
                                    <li>{like.productName}</li>
                                ))
                            }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div> );
}

export default Profile;