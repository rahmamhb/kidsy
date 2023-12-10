import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
const Notifications = () => {
    return ( 
        <div className="notification-page">
            <Sidebar></Sidebar>
            <div className="dashboard-container">
                <Header></Header>
                <div className="dashboard-content">
                    <p>Notifications</p>
                    <div className="notification-content1">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Notifications;