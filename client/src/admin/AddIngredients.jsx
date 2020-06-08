import React, { useState } from 'react'
import axios from 'axios';
import {navigate} from '@reach/router'


const AddIngredients = (props) => {

  const [name, setName] = useState('');
  const [image, setImage] = useState([]);
  const [errors, setErrors] = useState({});

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
  const handleIngredient = (e) => {
    e.preventDefault();
    const newIngredient = {name,image}
    console.log(newIngredient);
    axios.post('http://localhost:8000/api/ingredients', newIngredient)
        .then(res=>{
            console.log(res)
            if(res.data.errors){
                setErrors(res.data.errors)
            }else{
                console.log(newIngredient);
                // navigate('/')
              setImage([])
              setName('')
            }
        })
        .catch(err=>console.log(err))
    
  }

  return (
    <div className="col-sm-3" >
      <form onSubmit={handleIngredient}>
      <div className="form-group">
        <input type="text"
          name="name"
          className="form-control"
          onChange={e=>setName(e.target.value)}
        />
        </div>
        <div className="form-group">
        <input type="file"
          className="form-control"
          name="image"
          onChange={ upload }
        />
        </div>
        <input type="submit" className="btn btn-warning btn-block" value="Add Ingredient" />
      </form>

    </div>
  )
}

export default AddIngredients;
