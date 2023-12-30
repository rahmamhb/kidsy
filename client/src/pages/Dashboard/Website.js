import Sidebar from "../../components/Dashboard/Sidebar";
import Header from "../../components/Dashboard/Header";
import RatingStars from "../../components/RatingStars";
import CheckIcon from '@mui/icons-material/CheckRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import axios from 'axios';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
const Website = () => {
    const [reviewData , setReviewData] = useState([])
    const [faqData , setFaqData] = useState([])
    const [BlogsData , setBlogsData] = useState([])
    useEffect(() => {
        fetchReviewData();
    }, [reviewData]);
    useEffect(()=>{
        fetchBlog()
        fetchFaq()
    },[])
    const fetchBlog = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/blog/'); 
            setBlogsData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchFaq = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/faq/'); 
            setFaqData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const fetchReviewData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/review/'); 
            setReviewData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const handleDeleteReview = async (id) => {
        axios.delete(`http://localhost:3001/api/review/${id}`)
        .then(response =>{
            console.log('deleted successful:', response.data);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        })
    };
    const handleUpdateReview = async (id) => {
        axios.put(`http://localhost:3001/api/review/${id}`)
        .then(response =>{
            console.log('updated successful:', response.data);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        })
    };

    return ( 
        <div className="Dashboard-page">
            <Sidebar></Sidebar>
            <div className="flex flex-col gap-24  py-6">
                <Header></Header>
                <div className="flex flex-col gap-6">
                    <p className="text-3xl text-zinc-800">Website</p>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-5">
                            <h3 className="text-zinc-800 text-xl">Reviews</h3>
                            <div className="flex flex-row gap-x-6 overflow-x-scroll p-4 ">
                                {reviewData.map((review , index)=>{
                                    return(
                                        <div className="rounded-xl bg-white drop-shadow text-zinc-800 flex flex-col gap-4 p-4">
                                            <div className="flex flex-row gap-4">
                                                <span className="text-white h-12 w-12 rounded-full bg-zinc-400 flex items-center justify-center">
                                                    {review.reviwerName.split(' ').map(word => word.charAt(0)).join('')}
                                                </span>
                                                <div className="flex flex-col gap-1">
                                                    <p className="Reviewer-name">{review.reviwerName}</p>
                                                    <RatingStars rating={review.reviewRate}></RatingStars>
                                                </div>
                                            </div>
                                            <p className="w-64 text-zinc-500 font-light">{review.reviewContent}</p>
                                            <div className="flex flex-row gap-8 justify-end items-center">
                                                <span className="rounded-full bg-red-500 text-white cursor-pointer" onClick={() => handleDeleteReview(review.reviewID)}><CloseIcon className="h-4 w-4"></CloseIcon></span>
                                                <span className="rounded-full bg-green-500 text-white cursor-pointer" onClick={() => handleUpdateReview(review.reviewID)}><CheckIcon className="h-4 w-4"></CheckIcon></span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row justify-between">
                                <h3 className="text-zinc-800 text-xl">History</h3>
                                <select>
                                    <option>Blogs</option>
                                    <option>FAQs</option>
                                </select>
                            </div>
                            <div>
                            </div>                           
                        </div>
                        <div className="flex flex-row items-center gap-8">
                            <NavLink to="/website/add-blog">Add a Blog</NavLink>
                            <NavLink to="/website/add-faq">Add a FAQ</NavLink>
                        </div>
                   </div>

                </div>
            </div>
        </div>
    );
}
 
export default Website;