import "../styles/BlogHome.css"
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Swiper from 'swiper';
import { useEffect } from "react";
import axios from "axios";

const BlogHome = () => {
    const [BlogsData , setBlogsData] = useState([])

    useEffect(()=>{
        fetchBlog()
    },[])

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
    const fetchBlog = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/blog/'); 
            setBlogsData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    console.log(BlogsData)
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
                                    src={`http://localhost:3001/api/blog/images/${blog.blogImg}`}
                                    alt="blog img"
                                    />
                                </div>
                                < div className="blog-slider__content">
                                        <span className="blog-slider__code">{blog.created_at}</span>
                                        <div className="blog-slider__title">{blog.blogTitle}</div>
                                        <div className="blog-slider__text">{blog.blogContent}</div>
                                        <NavLink to={`blog/${blog.blogId}`}> Read more </NavLink>  
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