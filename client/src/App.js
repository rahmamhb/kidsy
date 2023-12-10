import './index.css';
import { Route , BrowserRouter as Router , Routes } from "react-router-dom";
import Home from './pages/Home';
import Blogs from "./pages/Blogs" ;
import Cart from "./pages/Cart" ;
import FAQ from './pages/Faq';
import Fav from './pages/Fav';
import Checkout from './pages/Checkout';
import Category from './pages/Category';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Dashboard/Orders';
import Stock from './pages/Dashboard/Stock';
import Website from './pages/Dashboard/Website';
import Notifications from './pages/Dashboard/Notifications';
import OrderDetail from './pages/Dashboard/OrderDetail';
function App() {
  return (
    <Router>
        <div className="App">
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>{/*to avoid Router matching*/}
                    <Route  path="/blog" element={<Blogs></Blogs>}></Route>
                    <Route  path="/faq" element={<FAQ></FAQ>}></Route>
                    <Route  path="/cart" element={<Cart></Cart>}></Route>
                    <Route  path="/favorites" element={<Fav></Fav>}></Route>
                    <Route  path="/checkout" element={<Checkout></Checkout>}></Route>
                    <Route  path='/category/:categoryID' element={<Category></Category>}></Route>
                    <Route  path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                    <Route  path="/orders" element={<Orders></Orders>}></Route>
                    <Route  path='/orders/orderdetail/:orderID' element={<OrderDetail></OrderDetail>}></Route>
                    <Route  path="/stock" element={<Stock></Stock>}></Route>
                    <Route  path="/website" element={<Website></Website>}></Route>
                    <Route  path="/notifications" element={<Notifications></Notifications>}></Route>
                </Routes>   
            </div>
        </div>
        </Router>

  );
}

export default App;
