import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
const Website = () => {
    return ( 
        <div className="website-page">
            <Sidebar></Sidebar>
            <div className="dashboard-container">
                <Header></Header>
                <div className="dashboard-content">
                    <p>Website</p>
                    <div className="website-content1">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Website;