import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as activeHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as disactiveHeart } from '@fortawesome/free-regular-svg-icons';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function ProductCard(props) {
    const {product} = props;
    const data = useContext(DataContext);
    //check여부 따라 달라지는 하트 적용하기 위함
    const [likeCheck , setLikeCheck] = useState(false);
    //이미지 클릭하면 이동하게 하기 위해
    const navigate = useNavigate();

    // 추가) 로그아웃한 뒤, likeCheck를 false로 만들기(하트 비우기)
    // useEffect는 라이프사이클이다 ... 
    // > data.state.user값을 확인해서 업데이트 :맨끝[]
    useEffect(()=>{
      //user값 null이면 setLikeCheck변경
      if(!data.state.user) {
        setLikeCheck(false);
      }
    } ,[data.state.user])




    // 버튼을 클릭했을 때 로그인이 되어 있다면, 유저의 likelist에 추가
    // 토글 기능(한번 누르면 추가/선택된 상태에서 누르면 해제)
    const toggleLike =()=> {
      if (!data.state.user) {
        //함수 안에서의 return은 함수 종료를 의미
        return;
      }
      //like가 선택되어있는지 확인
      //data.state.user.likelist[?].productId
      // > 배열 안에 상품id가 있으면 선택된 상태
      // find 메서드 - 해당 조건에 만족하는 첫 번째 요소의 값을 반환, 만족하지 않으면 undefined를 반환
      // 값이 있는 상태면 제거(filter메서드) / 값이 없는 상태면 추가(concat메서드)
      const likes = data.state.user.likelist;

      // likelist의 like중에서 아이디 같은 값 있다면 참
      if ( likes.find((like)=>(like.productId == product.productId)) ) {
        // 같은 값이 있는경우 제거(삭제)
        const newLikeList = likes.filter((like)=>(like.productId != product.productId));
        // user값이 객체이므로 이전의 값이 사라지지 않게 스프레드로 배열 풀어 저장
        data.action.setUser( {
          ...data.state.user,
          likelist : newLikeList,
        } )
        //값을 삭제한 상태 -> 같은값 없으니 하트 비워줌
        setLikeCheck(false);

      } else {
        // 값이 없을 때, likelist 추가하는 내용
        // like(객체형데이터)를 만들어 물건id와 물건이름을 추가하기
        const like = { productId:product.productId, productName:product.productName, }
        // like가 추가된 새로운 배열을 생성 (같은이름 가능한 이유:const는 {중괄호 블록} 안에서 유효)
        const newLikeList = likes.concat(like);
        // user값 객체이므로 이전의 값이 사라지지 않게 스프레드로 배열 풀어 저장 후에
        data.action.setUser( {
          ...data.state.user,
          likelist : newLikeList,
        } )
         //값을 추가한 상태 -> 찜목록 생성되었음 하트 채워줌
        setLikeCheck(true);
      }

      console.log(data.state.user);
    };

  return (
    <Card style={{ width: '15rem' }}>
        {/* 이미지를 변수와 함께 들고올 경우 require함수를 사용 */}
      <Card.Img 
      onClick={()=>{navigate('/product/'+product.productId)}}
      variant="top" src={require(`../img/${product.productPicture[0]}`)} />
      <Card.Body>
        <Card.Title>{product.productName}</Card.Title>
        {/* 로그인되어있다면, 버튼 클릭시 유저의 likelist에 추가 */}
        <Button variant="outline-primary" onClick={ toggleLike }>
            <FontAwesomeIcon icon={ likeCheck ? activeHeart : disactiveHeart }></FontAwesomeIcon>
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;