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
import AddProduct from './pages/Dashboard/AddProduct';
import AddBlog from './pages/Dashboard/AddBlog';
import AddFaq from './pages/Dashboard/AddFaq';
import UpdateBlog from './pages/Dashboard/UpdateBlog';
function App() {
  return (
    <Router>
        <div className="App">
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route  path="/faq" element={<FAQ></FAQ>}></Route>
                    <Route  path="/cart" element={<Cart></Cart>}></Route>
                    <Route  path="/favorites" element={<Fav></Fav>}></Route>
                    <Route  path="/checkout" element={<Checkout></Checkout>}></Route>
                    <Route  path='/category/:categoryID' element={<Category></Category>}></Route>
                    <Route  path="/dashboard" element={<Dashboard></Dashboard>}></Route>
                    <Route  path="/orders" element={<Orders></Orders>}></Route>
                    <Route  path='/orders/orderdetail/:orderID' element={<OrderDetail></OrderDetail>}></Route>
                    <Route  path="/stock" element={<Stock></Stock>}></Route>
                    <Route  path="/stock/add-product" element={<AddProduct></AddProduct>}></Route>
                    <Route  path="/website/add-blog" element={<AddBlog></AddBlog>}></Route>
                    <Route  path="/website/edit-blog" element={<UpdateBlog></UpdateBlog>}></Route>
                    <Route  path="/website/add-faq" element={<AddFaq></AddFaq>}></Route>
                    <Route  path="/website" element={<Website></Website>}></Route>
                    <Route  path="/notifications" element={<Notifications></Notifications>}></Route>
                    <Route  path="/blog/:blogID" element={<Blogs></Blogs>}></Route>
                </Routes>   
            </div>
        </div>
        </Router>

  );
}

export default App;
