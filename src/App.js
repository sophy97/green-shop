//css import
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// 공용으로 사용할 데이터컨텍스트 Provider추가
import { DataProvider } from './context/DataContext';


//route import
import {Routes, Route} from 'react-router-dom';
import Layout from './page/Layout';
import Home from './page/Home';
import Login from './page/Login';
import ProductDetail from './page/ProductDetail';
import Profile from './page/Profile';

function App() {
  return (
    <div className="App">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='loginform' element={<Login />} />
            <Route path='product/:id' element={<ProductDetail />} />
            <Route path='mypage' element={<Profile />} />
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
