import "../styles/BlogHome.css"
import React from 'react';
import { NavLink } from "react-router-dom";
import Swiper from 'swiper';
import blogImg from "../assets/blog5.jpg"
import { useEffect } from "react";
let BlogsData = [
    {blogId : 1 , blogTitle : "Lorem ipsum dolor sit amet" , blogcontent : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu. " , blogImg : blogImg , blogPublicationDate : "26 October 2023"},
    {blogId : 2 , blogTitle : "Lorem ipsum dolor sit amet" , blogcontent : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu. " , blogImg : blogImg , blogPublicationDate : "26 October 2023"},
    {blogId : 3 , blogTitle : "Lorem ipsum dolor sit amet" , blogcontent : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu.  Aliquam malesuada nunc eros, sit amet fringilla erat tincidunt eu. " , blogImg : blogImg , blogPublicationDate : "26 October 2023"}
    
]
const BlogHome = () => {
    useEffect(() => {
        console.log("Swiper Initializing...");
        new Swiper('.blog-slider', {
          spaceBetween: 30,
          effect: 'fade',
          loop: true,
          mousewheel: {
            invert: false,
          },
          pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
          },
        });
    }, []);
    return ( 
        <div className="blog-home-container">
            <p className="blog-home-header">Infant Insights: Parenting Pathways</p>
            <div className="blog-slider">
                <div className="blog-slider__wrp swiper-wrapper">
                    {BlogsData.map((blog , index)=>
                        (
                            <div className="blog-slider__item swiper-slide" key={blog.blogId}>
                                <div className="blog-slider__img">
                                    <img
                                    src={blog.blogImg}
                                    alt="blog img"
                                    />
                                </div>
                                < div className="blog-slider__content">
                                        <span className="blog-slider__code">{blog.blogPublicationDate}</span>
                                        <div className="blog-slider__title">{blog.blogTitle}</div>
                                        <div className="blog-slider__text">{blog.blogcontent}</div>
                                        <NavLink> Read more </NavLink>  
                                </div>
                            </div>
                        )
                    )}
                </div>
                <div className="blog-slider__pagination"></div>
            </div> 
        </div>
     );
}
 
export default BlogHome;