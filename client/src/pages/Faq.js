import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ExpandMoreIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { useState , useEffect} from 'react';
import axios from "axios";
const FAQ = () => {
    const [faqData , setFaqData] = useState([])
    const [faqStates, setFaqStates] = useState([]);
    const toggleFaq = (index) => {
        setFaqStates((prevStates) =>
          prevStates.map((state, i) => (i === index ? !state : state))
        );
    };
    useEffect(()=>{
        fetchFaq()
    },[])
    useEffect(() => {
        setFaqStates(Array(faqData.length).fill(true));
    }, [faqData]);
    const fetchFaq = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/faq/'); 
            setFaqData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return ( 
        <div className=' flex flex-col relative '>
            <Navbar></Navbar>
            <div className='flex flex-col gap-10 text-zinc-600 py-12 items-center'>
                <p className='text-3xl'>Frequently Asked Questions</p>
                <div className='flex flex-col gap-4'>
                    {faqData.map((faq , index)=>{
                        return(
                            <div key={index} className='shadow-md flex flex-col gap-6 bg-white p-6 w-[700px] '>
                                <div className='flex flex-row items-center justify-between gap-12'>
                                    <span className='flex justify-end'>{faq.faqQuestion}</span>
                                    {faqStates[index] ? <ExpandMoreIcon className='h-6 w-6 cursor-pointer' onClick={() => toggleFaq(index)} /> : <ExpandLessIcon className='h-6 w-6 cursor-pointer' onClick={() => toggleFaq(index)}/>}
                                </div>
                                {!faqStates[index] && <p className='text-zinc-500 w-[500px]'>{faq.faqAnswer}</p>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer></Footer>
        </div>
     );
}
 
export default FAQ;

