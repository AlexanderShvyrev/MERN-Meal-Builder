import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { navigate } from '@reach/router';
import "bootstrap/dist/css/bootstrap.min.css";

const NewProduct = (props) => {
    const [name, setName] = useState('');
    const [basePrice, setBasePrice] = useState('');
    const [image, setImage] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [productIngredients, setProductIngredients] = useState([]);
    const [errors, setErrors] = useState({});
    const[check, setCheck]=useState(false)


  const upload = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.addEventListener("load", () => {
        setImage(reader.result);
        console.log("image",image)
    }, false);
    if (file) {
        reader.readAsDataURL(file);
        console.log("file",file);
    }
  }
    useEffect(() => {
    axios.get(`http://localhost:8000/api/ingredients`)
      .then(res => {
          console.log(res.data);
        setIngredients(res.data);
      })
      .catch(err => console.log(err));
  }, []);
    const checkboxHandler = (e , id) => {
        console.log(e.target.checked)
        if(e.target.checked){
            axios.get(`http://localhost:8000/api/ingredients/${id}`)
            .then(res => {
                let temp = res.data
                console.log(res.data);
                setProductIngredients([...productIngredients, temp])
                console.log(productIngredients);  
                }
            )
        }else{
            var temp = productIngredients;
            console.log(id);
            for(var i = 0; i < temp.length; i++){
                if( id === temp[i]._id){
                    temp.splice(i,1);
                    setProductIngredients(temp);
                    console.log(productIngredients);
                }else{
                    continue;
                }
            }
        }
    }
    


const productHandler=(e)=>{
    e.preventDefault();
    const newProduct = {name: name, basePrice: basePrice, image: image, ingredients: productIngredients}
    console.log(newProduct)
    axios.post('http://localhost:8000/api/products', newProduct, {withCredentials:true})
    
        .then(res=>{
            console.log(res)
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                console.log(newProduct);
                navigate('/admin/new')
            }
        })
        .catch(err=>console.log(err))
}
    

    return (
        
        <div className="col-sm-6 text-center offset-lg-3 mt-5">
            <form onSubmit={productHandler} className="justify-content-center">
            <div className="form-group col-6">
                <input 
                className="form-control" 
                type="text"
                name="name"
                placeholder="Name..."
                onChange={e=>setName(e.target.value)}
                />
        
                <input 
                className="form-control" 
                type="number"
                name="basePrice"
                placeholder="Price..."
                onChange={e=>setBasePrice(e.target.value)}
                />
            
                <input 
                className="form-control" 
                type="file"
                name="image"
                onChange={ upload } 
                />
            </div>
            
                <div className="container mt-5">
                <div className="row mb-5">
                    
                    {ingredients.map(item=>
                        <div className="col-sm-3">
                            <div className="d-flex form-check" key={item._id}>
                                <input className="form-check-input" type="checkbox" name={item._id} onChange={e => checkboxHandler(e, item._id)}></input>
                            <label className="m-2 form-check-label">{item.name} <img
                                style={{
                                    height: "50px",
                                    width:"50px"
                                }}
                                src={item.image}></img></label>
                            </div>
                        </div>
                    )}
                
                </div>
                </div>
                <input type="submit" className="btn btn-warning" value="Add Product" />

            </form>
        </div>
    )
}

export default NewProduct
