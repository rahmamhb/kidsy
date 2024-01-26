import Header from "../../components/Dashboard/Header";
import Sidebar from "../../components/Dashboard/Sidebar";
import "../../styles/Dashboard/dashboard.css";
const Dashboard = () => {
    return (
        <div className="Dashboard-page">
            <Sidebar></Sidebar>
            <div className="dashboard-container">
                <div className="dashboard-content">
                    <p>Dashboard</p>
                    <div className="dashboard-content1">
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;