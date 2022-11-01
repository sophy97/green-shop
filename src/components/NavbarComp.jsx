import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import DataContext from '../context/DataContext';


function NavbarComp() {
    // 로그인 초기값은 true(로그인된화면)로 설정해둠
    const [login, setLogin] = useState(true);
    // 데이터 전체를 가져오자
    const data = useContext(DataContext);
    // 경로설정하는 useNavigate
    const navigate = useNavigate();
    // 컴포넌트가 마운트되자마자 로그인 정보를 확인하기 위해 useEffect
    useEffect(()=>{
        setLogin( data.state.user ? true : false );
    },[data.state.user])  //새로 로그인했을 때 화면이 바로 바뀌도록 설정

    //로그아웃 실행하는 함수
    const logOutFunc =()=> {
        setLogin(false);    // 컴포넌트를 바꿔주기 위해 먼저 login값을 false로 수정
        // 그 이후 user값을 null로 변경
        data.action.setUser(null);
        // 어디서 로그아웃하든 항상 홈으로 돌아가도록 navigate 이용해 경로설정
        navigate("/"); 
    }
    

    return (
    <>
    <Navbar bg="primary" variant="dark">
        <Container>

          <Navbar.Brand>
            <FontAwesomeIcon icon={faStore} />{" "}SHOP
          </Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </Nav>

          <Navbar.Collapse className="justify-content-end">
            { login ? ( 
            <Nav>
            {/* 로그인되었을 때, 출력될 컴포넌트 */}
            <NavLink className="nav-link" to={"/mypage"}
            style={{color:'lightgray'}}
            >{data.state.user.name}님의 MyPage
            </NavLink>
            <Button variant="outline-light" onClick={ logOutFunc }>Logout</Button>{' '}
            </Nav>
                ):(
            <div>
            {/* 로그인되지 않았을 때, 출력될 컴포넌트 */}
            <Button variant="outline-light" onClick={()=>{ navigate('/loginform') }}>Login</Button>{' '}
            </div>
            )}
         </Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
