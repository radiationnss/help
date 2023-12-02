import React, { useState } from 'react';
import axios from 'axios';

const Khalti = () => {
  const [paymentData, setPaymentData] = useState({
    return_url: 'http://localhost:3000/payment/',
    website_url: 'http://localhost:3000/',
    amount: 1100,
    purchase_order_id: '', // No initial purchase order ID
    purchase_order_name: 'test',
    customer_info: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the field is 'amount', parse the value to a number
    const newValue = name === 'amount' ? parseFloat(value) : value;

    setPaymentData((prevData) => ({
      ...prevData,
      customer_info: {
        ...prevData.customer_info,
        [name]: newValue,
      },
    }));
  };

  const handleKhaltiButtonClick = () => {
    // Generate a random purchase order ID
    const randomOrderId = Math.floor(Math.random() * 100).toString();
    
    // Set the random purchase order ID
    setPaymentData((prevData) => ({
      ...prevData,
      purchase_order_id: randomOrderId,
    }));

    const backendEndpoint = 'http://localhost:3001/khalti-payment';

    axios.post(backendEndpoint, paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log('Payment successful:', response.data);
        
        // Extract the payment URL from the response
        const paymentUrl = response.data.payment_url;

        // Redirect the user to the payment URL
        window.location.href = paymentUrl;
      })
      .catch(error => {
        console.error('Error sending payment data:', error);
        // Handle error or show an error message to the user
      });
  };

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={paymentData.customer_info.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={paymentData.customer_info.phone}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={paymentData.customer_info.email}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <br />
      <button onClick={handleKhaltiButtonClick}>Khalti</button>
    </div>
  );
};

export default Khalti;
