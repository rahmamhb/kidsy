import { useState , useEffect } from "react";
import axios from 'axios';
import Sidebar from "../../components/Dashboard/Sidebar";
import "../../styles/Dashboard/AddProduct.css"
const AddProduct = () => {

    let [CategoriesData , setCategoriesData ]= useState([{}])
    const [productName , setProductName] = useState("")
    const [productCategory , setProductCategory] = useState(CategoriesData[0].categoryID)
    const [productDescription , setProductDescription] = useState("")
    const [productPrice , setProductPrice] = useState()
    const [productDiscount , setProductDiscount] = useState()
    const [productQuantity , setProductQuantity] = useState()
    const [file, setFile] = useState();
    const [previewImage, setPreviewImage] = useState(null)

    const [productColors, setProductColors] = useState([
        '#000000', 
        '#000000', 
        '#000000', 
    ]);;

    useEffect(() => {
        fetchCategoriesData();
    }, []);
    
    const fetchCategoriesData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/category/'); 
            setCategoriesData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const handleColorChange = (event, colorIndex) => {
        const color = event.target.value;
        setProductColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[colorIndex] = color;
          return newColors;
        });
    };

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
    const handleSubmitProduct =()=>{
        const formData = new FormData()

        formData.append('productName' , productName)
        formData.append('productDescription' , productDescription)
        formData.append('productPrice' , productPrice)
        formData.append('productDiscount' , productDiscount)
        formData.append('productCategory' , productCategory)
        formData.append('productQuantity' , productQuantity)
        formData.append('productColors' , productColors)
        formData.append('productColor1' , productColors[0])
        formData.append('productColor2' , productColors[1])
        formData.append('productColor3' , productColors[2])
        formData.append('image', file);;

        axios.post('http://localhost:3001/api/product/' , formData)
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
                <p className="add-product-title">Add a product</p>
                <form className="add-product-form" onSubmit={handleSubmitProduct}>
                    <div className="add-product-form-section1">
                            <div className="label-float">
                                <input type="text" placeholder=" " value={productName} onChange={(e)=>{ setProductName(e.target.value)}} required/>
                                <label>Product Name</label>
                            </div>
                            <div className="text-area">
                                <label>Product Description</label>
                                <textarea placeholder="Notes about your product , special notes ." value={productDescription} onChange={(e)=>{ setProductDescription(e.target.value)}} required ></textarea>
                            </div> 
                            <select value={productCategory} onChange={(e)=>{ setProductCategory(e.target.value)}} required>
                                {CategoriesData.map(category => (
                                    <option value={category.categoryID}>{category.categoryName}</option>
                                ))}
                            </select>
                    </div>
                    <div className="add-product-form-section2">
                        <div className="product-images">
                            <div className="input-img">
                                <label htmlFor="productImages">Product Images:</label>
                                <input
                                type="file"
                                name="image"
                                onChange={handleFile}
                                />
                            </div>
                            <img src={previewImage} alt={`blog img`} className="h-[150px] w-[250px] rounded-md"/>
                            {/*<div className="rendred-img">
                                {productImages.map((image, index) => (
                                    <div key={index}>
                                        <img src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} />
                                    </div>
                                ))}
                                </div>*/}
                        </div>
                        <div className="product-colors">
                            <div className="input-color">
                                {productColors.map((color, index) => (
                                    <div key={index}>
                                        <label htmlFor={`colorInput${index + 1}`}>{`Color ${index + 1}:`}</label>
                                        <input
                                        type="color"
                                        id={`colorInput${index + 1}`}
                                        value={color}
                                        onChange={(e) => handleColorChange(e, index)}
                                        required
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="rendred-colors">
                                <p>Selected Colors:</p>
                                {productColors.map((color, index) => (
                                <div key={index} style={{ backgroundColor: color }}></div>
                                ))}
                            </div>
                        </div>
                        <div className="product-numbers">
                            <div className="label-float">
                                <input type="number" placeholder="1000 DZD " value={productPrice} onChange={(e)=>{ setProductPrice(e.target.value)}} required/>
                                <label>Price</label>
                            </div>
                            <div className="label-float">
                                <input type="number" placeholder="0.5" value={productDiscount} onChange={(e)=>{ setProductDiscount(e.target.value)}} required/>
                                <label>Discount</label>
                            </div>
                            <div className="label-float">
                                <input type="number" placeholder="10" value={productQuantity} onChange={(e)=>{ setProductQuantity(e.target.value)}} required/>
                                <label>Quantity</label>
                            </div>
                        </div>
                        <div className="add-product-btn">
                            <button type="reset" className="product-cancel-btn">Cancel</button>
                            <button type="submit" className="order-btn" >Add product</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default AddProduct;