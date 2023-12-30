import { useState , useEffect } from "react";
import axios from 'axios';
import Sidebar from "../../components/Dashboard/Sidebar";
import "../../styles/Dashboard/AddProduct.css"
const AddBlog = () => {
    const [blogTitle , setBlogTitle] = useState("")
    const [blogContent , setBlogContent] = useState("")
    const [file, setFile] = useState();
    const [previewImage, setPreviewImage] = useState(null);

    const handleFile = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }

        setFile(selectedFile);
    };
    const handleSubmitBlog =()=>{
        const formData = new FormData();
        formData.append('blogTitle', blogTitle);
        formData.append('blogContent', blogContent);
        formData.append('image', file);

        axios.post('http://localhost:3001/api/blog/' , formData)
        .then(res =>{
            if(res.data.staus === "Success"){
                console.log("succeded")
            }
            else{
                console.log("failed")
            }
        })
        .catch(err => console.log(err))
    }
    return ( 
        <div className="Dashboard-page">
            <Sidebar></Sidebar>
            <div className="add-product-container">
                <p className="add-product-title">Add a Blog</p>
                <form className="add-product-form" onSubmit={handleSubmitBlog}>
                    <div className="add-product-form-section1">
                            <div className="label-float">
                                <input type="text" placeholder=" " value={blogTitle} onChange={(e)=>{ setBlogTitle(e.target.value)}} required/>
                                <label>Blog Title</label>
                            </div>
                            <div className="text-area">
                                <label>Blog Content</label>
                                <textarea placeholder="Notes about your product , special notes ." value={blogContent} onChange={(e)=>{ setBlogContent(e.target.value)}} required ></textarea>
                            </div> 
                    </div>
                    <div className="add-product-form-section2">
                        <div className="product-images">
                            <div className="input-img">
                                <label htmlFor="productImages">Blog Image:</label>
                                <input
                                type="file"
                                id="blogImages"
                                name="image"
                                onChange={handleFile}
                                />
                            </div>
                            <img src={previewImage} alt={`blog img`} className="h-[150px] w-[250px] rounded-md"/>
                        </div>
                        <div className="add-product-btn">
                            <button type="reset" className="product-cancel-btn w-[7em]">Cancel</button>
                            <button type="submit" className="order-btn" >Add Blog</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default AddBlog;