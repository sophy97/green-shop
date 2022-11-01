import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import ProductDisplay from "../components/ProductDisplay";
import DataContext from "../context/DataContext";

const ProductDetail = () => {
    // 전체데이터(컨텍스트)-> 제품데이터/댓글데이터 순으로 받아오기
    const data = useContext(DataContext);
    const {id} = useParams();
    const [comments, setComments] = useState (
            data.state.allComments.filter(
                (comment)=>(comment.productId == id))
            );

    // [data의state.allComment]의 값이 바뀔 때마다 update되도록
    useEffect(()=>{
        setComments( data.state.allComments
            .filter((comment)=>(comment.productId == id)) )
    },[data.state.allComments])

    // data의 state값을 바로 수정해서 사용하는 방식
    const getProduct =()=>{
        return data.state.productList.find (
        (product)=>(product.productId == id)
        )
    }

    return (
        <div>
            <ProductDisplay product={getProduct()} />
            <br></br>
            <hr />
            <CommentInput productId={id} />
            <ListGroup style={{textAlign:'left'}}>
                {               
                                        // comment(자식) 컴포넌트에 넘겨줄 props값 작명
                comments.map((comment)=>(<Comment key={comment.commentId} comment={comment} />))
                }
            </ListGroup>
        </div> 
        );
}

export default ProductDetail;