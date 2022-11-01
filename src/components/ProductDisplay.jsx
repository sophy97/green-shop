import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const ProductDisplay = (props) => {
    const { product } = props;
    // 사진 인덱스값 따라 색테마 변하도록..
    const [index, setIndex] = useState(0);
    return ( 
        <div>
            <Container>
                <Row>
                    <Col>
                        <div>
                        <img src={require(`../img/${product.productPicture[index]}`)} alt="" />
                        </div>
                    </Col>
                    <Col>
                        <>
                            <h1>{product.productName}</h1>
                            <p>{product.ProductDetail}</p>
                            <p> 색상 설명</p>
                            <div>
                                {
                                //productColor에 있는 color값을 백그라운드로 사용
                                product.productColor.map((color,i)=>(
                                    <div className='m-2' style={{display:'inline-block',
                                    width:"30px", height:"30px",
                                    backgroundColor: color,
                                    border: '3px solid lightgray'
                                    }}
                                onMouseEnter={()=>{setIndex(i)}}
                                ></div>
                                ))
                                }
                            </div>
                            <div className="d-grid gap-2">
                                <Button variant="primary" size="lg">
                                구매하기
                                </Button>
                                <Button variant="outline-dark" size="sm">
                                    장바구니
                                </Button>{' '}
                                <Button variant="outline-dark" size="sm">
                                    찜하기
                                </Button>{' '}
                            </div>
                        </>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductDisplay;