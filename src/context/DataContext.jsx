// Context 관련 내용은 공식 홈페이지 고급안내서 참조
// Context를 사용해서, value값도 현재 파일에서 지정 후 내보내기

import { useState } from "react";
import { createContext } from "react";
// 지금까지는, 내보낸 DataContext에 value를 넣어 App에서 사용해왔음
const DataContext = createContext();

/* Context 객체 안에는 원래 Provider라는 컴포넌트가 들어있다!
Provider에서는 value값을 통해 컴포넌트 간에 공유하고자 하는 값을
value 라는 Props로 설정해서 자식 컴포넌트들에서 해당 값에 바로(전역)접근 가능
*/  
// 지금은, Provider를 여기서 작성해서 value값을 이미 가진 컴포넌트를 미리 내보내는 방식
// 컴포넌트니까 함수형컴포넌트(형식)으로 작성
const DataProvider = ({children})=> {

    // 사용할 값들을 useState hook 통해 들고온다

    //0 유저 정보 { name:"길동", profile:null, likelist:[] }
    const [user, setUser] = useState( { name:"기욤", profile:null, likelist:[] });

    //0 상품 정보
    //리스트(상품배열)로 들어가고, 그 안에는 객체 형태로 [ { } ]
    const [productList, setProductList] = useState([
        {
            productId : 1,
            productName : "React-Book",
            productDetail : "리액트 안내 도서",
            productColor : ["white", "black"],
            productPicture : ["book1.png", "book2.jpg"]
        },
        {
            productId : 2,
            productName : "구름빵",
            productDetail : "다른책",
            productColor : ["white"],
            productPicture : ["book5.jpg"]
        },
        {
            productId : 3,
            productName : "검정고무신",
            productDetail : "다른책",
            productColor : ["white"],
            productPicture : ["book3.jpg"]
        },
        {
            productId : 4,
            productName : "달러구트 꿈 백화점",
            productDetail : "다른책",
            productColor : ["white"],
            productPicture : ["book4.jpg"]
        },

    ]);

    //0 댓글 정보
    // 게시글마다 댓글X, 모아서 보여줄것
    const [allComments, setAllComments] = useState([
        {
            commentId : 1,
            productId : 1,
            name : "green",
            text : "괜찮네영"
        },
        {
            commentId : 2,
            productId : 1,
            name : "pig",
            text : "어려워요..별로임.."
        },
        {
            commentId : 3,
            productId : 1,
            name : "큐트걸",
            text : "쉬워용ㅎㅎ"
        },
        {
            commentId : 4,
            productId : 3,
            name : "댕댕이",
            text : "완죤추억임"
        },
    ]);
    // useState사용하지 않은 변수는 리액트 update를 일으키지 않음
    //안먹혀서 이거 쓰겠다함.. 이해안됨 >> commentInput가서 카운트값 올려주셈
    const[commentCount ,setCommentCount] = useState(3);

    // 사용할 value값들을 state(초기값)과 action(변경값) 분리해서 넣어둔다
    const value = {
        state: {user, productList, allComments, commentCount},
        action: {setUser, setProductList, setAllComments, setCommentCount }
    };

    // DataProvider를 사용할 때, DataContext.Provider를 사용 가능하게 함
    // 이때, children은 Provider를 쓸때 데이터를 공용으로 쓰는 컴포넌트들임 (??)
    return <DataContext.Provider value={value}> {children} </DataContext.Provider>
};

// consumer 작성
// DataContext 의 값을 가져와, DataConsumer로 사용하겠다
const { Consumer : DataConsumer } = DataContext;


// 컴포넌트로 사용하기 위해 export >> .Provider대신 사용할 컴포넌트임
// 원래 Provider는 App 전체를 감싸서 사용했음
export { DataConsumer, DataProvider }

// 값을 사용하기 위해 가져오는 컨텍스트를 export
export default DataContext;