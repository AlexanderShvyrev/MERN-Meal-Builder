import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount, success, id }) => {
  console.log(amount);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const deleteOrder = () => {
      axios.delete(`http://localhost:8000/api/orders/${id}`);
    };
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      try {
        const response = await axios.post('http://localhost:8000/api/charge', {
          id,
          amount: amount * 100,
        });
        console.log(response.data);
        success();
        setTimeout(() => deleteOrder(), 600000);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className='form-group' style={{ maxWidth: '400px' }}>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button className='btn btn-info' type='submit' disabled={!stripe}>
          Place Order
        </button>
      </form>
    </div>
  );
};

const stripePromise = loadStripe('API_KEY');
const Checkout = (props) => {
  const userId = localStorage.getItem('user');
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('OK');
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/orders`)
      .then((res) => setOrders(res.data));
  }, []);
  if (status === 'success') {
    return <div>Thank you for your purchase!</div>;
  }

  const MyOrders = (e) => {
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].customer === userId) {
        console.log(orders[i]);
      }
    }
  };

  return (
    <div>
      <h1>Your Order Summary:</h1>
      {orders
        .filter((u) => u.customer === userId)
        .map((order, i) => {
          return (
            <div className='col-sm-4' style={{ display: 'inline-block' }}>
              <div className='card' key={order._id}>
                <div className='card-body'>
                  <h4 className='card-title'>
                    Order number: {Math.floor(Math.random() * 1000) - 1}
                  </h4>
                  <p className='card-text'>Total price: ${order.totalPrice}</p>

                  <ul className='list-group list-group-flush'>
                    {order.products.map((item) => {
                      return (
                        <li className='list-group-item'>{item.addedName}</li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <br></br>
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={order.totalPrice}
                  id={order._id}
                  success={() => {
                    setStatus('success');
                  }}
                />
              </Elements>

              <button className='btn btn-warning'>
                <Link to='/menu'>Add More To Your Order</Link>
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Checkout;
