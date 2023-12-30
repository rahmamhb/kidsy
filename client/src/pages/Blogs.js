import Navbar from "../components/Navbar";
import { useParams } from 'react-router-dom/dist'
import Footer from "../components/Footer"
import { useState , useEffect } from "react";
import axios from "axios";
const Blogs = () => {
    const [blogData , setBlogData] = useState({})
    const blogID = useParams().blogID
    useEffect(()=>{
        fetchBlog()
    },[])
    const fetchBlog = async()=>{
        try {
            const response = await axios.get(`http://localhost:3001/api/blog/${blogID}`); 
            setBlogData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return ( 
        <div className=' flex flex-col relative '>
            <Navbar></Navbar>
            <div className='flex flex-col items-center text-zinc-950 py-6 gap-6'>
                <div className='flex flex-col items-start gap-5'>
                    <p className='text-2xl md:text-3xl'>{blogData.blogTitle}</p>
                    <img src={`http://localhost:3001/api/blog/images/${blogData.blogImg}`} alt='blog_img' className='w-[40vw] h-[350px]'></img>
                </div>
                <span className='w-[90vw] h-[1px] bg-neutral-200'></span>
                <div className='flex flex-col gap-4'>
                    <p className='w-[60vw]'>{blogData.blogContent}</p>
                    <p className='text-neutral-200'>{blogData.created_at}</p>
                </div>
            </div>
            <Footer></Footer>
        </div>
     );
}
 
export default Blogs;

