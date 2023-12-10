import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
const Stock = () => {
    return ( 
        <div className="stock-page">
            <Sidebar></Sidebar>
            <div className="dashboard-container">
                <Header></Header>
                <div className="dashboard-content">
                    <p>stock</p>
                    <div className="stock-content1">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Stock;
