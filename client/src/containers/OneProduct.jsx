import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import { Draggable } from '@shopify/draggable';
import axios from 'axios';
import Tooltip from '@material-ui/core/Tooltip'
import Cookies from 'js-cookie';

// function getWindowDimensions() {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//       width,
//       height
//     };
//   }
  
// function useWindowDimensions() {
//     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
//     useEffect(() => {
//       function handleResize() {
//         setWindowDimensions(getWindowDimensions());
//       }
  
//       window.addEventListener('resize', handleResize);
//       return () => window.removeEventListener('resize', handleResize);
//     }, []);
  
//     return windowDimensions;
//   }

const OneProduct = (props) => {
    const [product, setProduct] = useState(null);
    const [price, setPrice] = useState(0);
    const [ingName, setIngName] = useState("");
    const [ings,setIngs] = useState([]);
    const [newName, setNewName]=useState('');
    const [orders, setOrders]=useState([]);
    const [orderPs, setOrderPs]=useState([]);
    const userId=localStorage.getItem('user')

    const onDropHandler = (e) => {
        e.preventDefault()
        let incPrice = price
        incPrice += 1;
        setPrice(incPrice);
        setIngs([...ings,ingName]);
        var ele = document.elementsFromPoint(e.screenX + 1, e.screenY + 1);
        
    }
    const HandleZoneDrop= (e) =>{
        e.preventDefault()
        let decPrice = price
        decPrice -= 1;
        setPrice(decPrice)
        const tempArr = [...ings];
        for (let i = 0; i < tempArr.length; i++){
            if (tempArr[i] === ingName) {
                tempArr.splice(i, 1);
                setIngs(tempArr)
            }
        }
    }
    const getOrders = () => {
        axios.get(`http://localhost:8000/api/orders/`) 
            .then(res => {
                //setOrders(res.data)
                console.log("================", res.data)
                console.log("userid", userId)
                var temp = res.data.filter(o => o.customer === userId);
                console.log("this is temp", temp)
                setOrders(temp)
                setOrderPs(temp.products);
                console.log("products", orders);
                // for(var i = 0; i < res.data.length; i++){
                //     if(userId == res.data[i].customer){
                //         console.log("+++++++++++",res.data[i]);
                //         setOrders(res.data[i]);
                //         setOrderPs(res.data[i].products);
                //         console.log("orders", orders);
                //     }
                // }
        })
            .catch(err => console.log(err));
    }
    const getProducts = () => {
    axios.get(`http://localhost:8000/api/products/${props._id}`) 
        .then(res => {
            setProduct({...res.data})
            setPrice(res.data.basePrice);
            setNewName(res.data.name)
        console.log(res.data)
    })
      .catch(err => console.log(err));
  }
  
  const createNew = (e) => {
      const newProduct = {addedName: newName, addedPrice: price, addedIngredients: ings, cust_id:userId}
      axios.post('http://localhost:8000/api/addedProducts', newProduct)
      .then(res=>{
          console.log(res)
          console.log(newProduct)
          createOrder(newProduct);
        })
        .catch(err=>console.log(err))
        
    }
    useEffect(() => {
    getOrders();
    getProducts();
    
  }, []);
  
    const createOrder = (newProduct) => {
        console.log(orders);
        if(orders.length < 1 ){
            console.log("in empty")
            
            const newOrder={ customer:userId, totalPrice:price, products: newProduct } 
            axios.post(`http://localhost:8000/api/orders`, newOrder)
            .then(res=>{
                setOrders([...orders, newOrder])
                console.log(res)
                navigate(`/cart/${res.data._id}`)
        })
                .catch(err=>console.log(err))
        } else {
            for(var i = 0; i < orders.length; i++){
               if (userId === orders[i].customer){
                   console.log("this is customer", orders[i].customer);
                    const updatedProd= {totalPrice:newProduct.addedPrice + orders[i].totalPrice, products: [...orders[i].products, newProduct] } 
                    console.log("in the else to create order");
                    axios.put(`http://localhost:8000/api/orders/${orders[i].customer}`, updatedProd)
                                    .then(res=>{
                                        console.log(res)
                                        navigate(`/cart/${userId}`);
                                })
                                .catch(err=>console.log(err))
                } 
            }
            
        }
    }
   
    return (
        <div>
            {
            product ? 
                <div className="card text-center bananas"> 
                    <h4 className="card-title text-center">{product.name}</h4>
                    <div style={{
                            margin: 'auto',
                            width: '50%',
                            padding: '10px',
                            
                        }}> <img className="card-img-top" draggable="false" src={product.image} style={{
                            width: "300px",  
                            height: "300px",
                            position:'relative'
                        }} alt="Card image cap"></img></div>
                        <div id="drop" className="dropzone" style={{
                            minHeight: "150px",
                            height:"150px",
                            minWidth: "150px",
                            maxWidth: "1500px",
                            margin: 'auto',
                            width: '75%',
                            padding: '10px',
                        }}
                            onDrop={onDropHandler}>

                    </div> 
                    <div className="card-body">
                <h5 className="card-text " style={{color:'#BD6026'}}> Price: ${price.toFixed(2)}</h5>
                    <div className="originalzone" onDrop={HandleZoneDrop} style={{
                            minHeight: "150px",
                            height:"150px",
                            minWidth: "150px",
                            maxWidth: "1500px",
                            margin: 'auto',
                            width: '75%',
                            padding: '10px',
                            }}>
                                {/* const imgstyle = {} */}
                              {/* <span style={{background-image:particular_ad.png; @media (max-width:300px){background-image:particular_ad_small.png;} }}></span> */}
                    {product.ingredients.map((ing)=>{                        
                        return(
                            <div className="draggable" draggable="true" onDrag={(e) => { setIngName(ing.name) }} key={ing._id}><Tooltip title={ing.name} arrow><img src={ing.image}
                                style={{
                                    height: "150px",
                                    width: "150px",
                                    position: 'relative',
                                }}alt={ing.name} /></Tooltip></div>
                        )
                        })                           
                    }
                    </div>
                </div>
                {/* <Link to='/build'><img src="" alt-src="" className="card-image"></img></Link> */}
                </div>
                :
                <p>Loading . . .</p>
            }
                <button type="submit" className="btn btn-dark btn-lg m-5" onClick={createNew}>Add To Order</button>
        </div> 
    )
}

export default OneProduct

var dragged;

/* events fired on the draggable target */
document.addEventListener("drag", function(event) {

}, false);

document.addEventListener("dragstart", function(event) {
  // store a ref. on the dragged elem
  dragged = event.target;
  // make it half transparent
  event.target.style.opacity = .5;
}, false);

document.addEventListener("dragend", function(event) {
  // reset the transparency
  event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
document.addEventListener("dragover", function(event) {
  // prevent default to allow drop
  event.preventDefault();
}, false);

document.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className === "dropzone") {
        event.target.style.background = "#BD60264D";
    }else if(event.target.className === "originalzone"){
        event.target.style.background = "#BD60264D";
    }
    
  
  }, false);
  
  document.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className === "dropzone") {
      event.target.style.background = "";
    }else if(event.target.className === "originalzone"){
        event.target.style.background = "";
    }
  
  }, false);
  
  document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className === "dropzone") {
      event.target.style.background = "";
      dragged.parentNode.removeChild( dragged );
      event.target.appendChild( dragged );
    }else if(event.target.className === "originalzone"){
        event.target.style.background = "";
        dragged.parentNode.removeChild( dragged );
        event.target.appendChild( dragged );
    }
  }, false);
