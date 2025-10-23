import { useState, useEffect} from "react";
import Loader from "./loader.jsx"


function ImageUploader(){
const [images, setImages] = useState([]);
const [error,setError] = useState("")
const [isSubmitting,setIssubmitting] = useState(false)
/* console.log(isSubmitting)
console.log(error) */
console.log(images)
    const handleSubmit = ()=>{
        console.log("Successful Upload of image" , images)
        if(images.length >= 1){
        setIssubmitting(prev => !prev)
        }else{
            setError("Upload at least 1 image")
        }
    }

useEffect(()=>{
   setInterval(() => {
    
   }, 1000);
},[isSubmitting])

    const handleChange = (e)=>{
        const files = e.target.files;
        const fileArray = Array.from(files)
        const newImages = fileArray.map((file) =>({
            id : URL.createObjectURL(file),
            file: file,
            preview : URL.createObjectURL(file),
        }));
        if(images.length + newImages.length > 5){
            setError("Θ Error: You can upload a maximum of 5 images")
            event.target.files = "null"
        }
        setImages((prev) => [...prev, ...newImages])
        setError('')
    }
    const handleDelete = (index) =>{
        setImages(images.filter((img)=> img.id !== index))
    }

    return(
        <div>
            <h1>Product Verification Upload</h1>
            <p>Upload up to 5 images of your product for verification</p>
            <div className="content-container">
                    <div className="content">
                    <h3>Drag & drop your image here, or browse </h3>
                    <p>Supports: JPEG , PNG. Max 5 images </p>
                    <label for="file-upload" class="upload-box">
                        <span>Select files </span>
                    </label>
                    <input 
                        type="file"
                        accept="image/png, image/jpeg"
                        id = "file-upload"
                        multiple
                        onChange={handleChange}
                    />
                    </div>
                    <div className="image-container">
                        {images.map((img) =>{
                            return(
                            <div 
                            className="image-item"
                            key={img.id}>
                                <img src={img.id} 
                                    alt="Uploaded"
                                    width={200}
                                    height={200}
                                />
                                <button 
                                onClick={() => handleDelete(img.id)}
                                className="cancel-btn"> &times; </button>
                            </div>
                        )})}
                    </div>
                    {error && <p className="Error-msg">{error}</p>}
                    <div>

                    </div>
                        {isSubmitting && <Loader/>}
                    <div className="button_div">
                        <button onClick={handleSubmit}>Submit Verification</button>
                    </div>
            </div>
        </div>
    )
}
export default ImageUploader;