import "../styles/Home.css"
import React from "react";
import FurnitureIcon from '@mui/icons-material/ChildFriendlyOutlined';
import { NavLink } from "react-router-dom";

let CategoriesData = [
    {Category_ID : 1 , Category_name : "Nursery Furniture" },
    {Category_ID : 2 , Category_name : "Nursery Furniture" },
    {Category_ID : 3 , Category_name : "Nursery Furniture" },
    {Category_ID : 4 , Category_name : "Nursery Furniture" },
    {Category_ID : 5 , Category_name : "Nursery Furniture" },
    {Category_ID : 6 , Category_name : "Nursery Furniture" },
    {Category_ID : 7 , Category_name : "Nursery Furniture" },
    {Category_ID : 8 , Category_name : "Nursery Furniture" },
    {Category_ID : 9 , Category_name : "Nursery Furniture" },
    {Category_ID : 10 , Category_name : "Nursery Furniture" },
    {Category_ID : 11 , Category_name : "Nursery Furniture" },
    {Category_ID : 12 , Category_name : "Nursery Furniture" },
    {Category_ID : 13 , Category_name : "Nursery Furniture" }
]
const getRandomPastelColor = () => {
    // Generate a random pastel color in HSL format
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 20) + 80; // Adjust the saturation for pastel shades
    const lightness = Math.floor(Math.random() * 20) + 70; // Adjust the lightness for pastel shades
  
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};
const Categories = () => {

    return ( 
        <div className="catego-container">
            <p>Select category</p>
            <div className="catego-list">
                {CategoriesData.map((category , index)=>{
                    return(
                        <div className="category" key={category.Category_ID}>
                            <NavLink>
                                <span style={{ color: getRandomPastelColor() }}>
                                    <FurnitureIcon></FurnitureIcon>
                                </span>
                                <p>{category.Category_name}</p>
                            </NavLink>
                            
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default Categories;