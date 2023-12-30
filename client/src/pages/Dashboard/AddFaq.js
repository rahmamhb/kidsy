import { useState , useEffect } from "react";
import axios from 'axios';
import Sidebar from "../../components/Dashboard/Sidebar";
import "../../styles/Dashboard/addFaq.css"
const AddFaq = () => {

    const [faqQuestion , setFaqQuestion] = useState("")
    const [faqAnswer , setFaqAnswer] = useState("")
    console.log(faqQuestion)
    console.log(faqAnswer)
    const handleSubmitFaq =()=>{
        const data = {
            faqQuestion: faqQuestion,
            faqAnswer: faqAnswer
        };
        axios.post('http://localhost:3001/api/faq/' , data)
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
            <div className="add-faq-container py-10">
                <p className="add-product-title text-4xl text-zinc-700">Add a FAQ</p>
                <form className="flex flex-col items-center gap-6" onSubmit={handleSubmitFaq}>
                    <div className="flex flex-col items-start gap-4">
                            <div className="label-float">
                                <input className=" py-6 px-5 min-w-[250px]" type="text" placeholder=" " value={faqQuestion} onChange={(e)=>{ setFaqQuestion(e.target.value)}} required/>
                                <label>FAQ Question</label>
                            </div>
                            <div className="text-area">
                                <label>FAQ Answer</label>
                                <textarea className="w-[28em] min-h-[210px]" placeholder=" " value={faqAnswer} onChange={(e)=>{ setFaqAnswer(e.target.value)}} required ></textarea>
                            </div> 
                    </div>
                    <div className="add-product-btn">
                        <button type="reset" className="product-cancel-btn ">Cancel</button>
                        <button type="submit" className="order-btn" >Add FAQ</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default AddFaq;