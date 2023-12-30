import "../styles/Home.css"
import React, { useState , useEffect} from "react";
import axios from 'axios';
import FurnitureIcon from '@mui/icons-material/ChildFriendlyOutlined';
import { NavLink } from "react-router-dom";


const getRandomPastelColor = () => {
    // Generate a random pastel color in HSL format
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 20) + 80; // Adjust the saturation for pastel shades
    const lightness = Math.floor(Math.random() * 20) + 70; // Adjust the lightness for pastel shades
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
const Categories = () => {
    const [CategoriesData , setCategoriesData] = useState([])

    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/category/'); 
            setCategoriesData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return ( 
        <div className="catego-container">
            <p>Select category</p>
            <div className="catego-list">
                {CategoriesData.map((category , index)=>{
                    return(
                        <div className="category" key={category.categoryID}>
                            <NavLink to={`category/${category.categoryID}`}>
                                <span style={{ color: getRandomPastelColor() }}>
                                    <FurnitureIcon></FurnitureIcon>
                                </span>
                                <p>{category.categoryName}</p>
                            </NavLink>
                            
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Categories;