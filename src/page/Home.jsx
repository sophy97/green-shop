// 슬릭 라이브러리 들고오기
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import DataContext from "../context/DataContext";


const Home = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    const {state} = useContext(DataContext);
    return ( 
    <div>
        <Container>
            {/* 클래스명은 부트스트랩에서 써놓은 클래스명! */}
            <Row className="mt-5">
                <Col className="px-3">
                <Slider {...settings}>
                {state.productList.map((product)=>(
                    <div>
                        <ProductCard key={product.productId} product={product} />
                    </div>
                ))}
                </Slider>
                </Col>
            </Row>
        </Container>
    </div>
    );
}
export default Home;


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
        icon={faChevronRight}
        className={className}
        onClick={onClick}
        style={{color:'blue'}}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <FontAwesomeIcon
        icon={faChevronLeft}
        className={className}
        onClick={onClick}
        style={{color:'blue'}}
        />
    );
}