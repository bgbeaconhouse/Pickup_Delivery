import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewDeliveries = () => {
  const [error, setError] = useState(null);
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    async function fetchDeliveries() {
      try {
        const response = await fetch("http://localhost:3000/api/deliveries")
        const result = await response.json();
        console.log(result)
        setDeliveries(result)
      } catch (error) {
        setError(error)
      }
    }
    fetchDeliveries();
  }, []);

  const handleBack = () => {
    navigate('/home'); // Navigate to /home
  };

  const deliveryListItems = deliveries.map((delivery) => (
    <div key={delivery.id}>
      <p>Delivery Date: {new Date(delivery.deliveryDate).toLocaleDateString()}</p>
      <p>Customer Name: {delivery.customerName}</p>
      <p>Customer Phone: {delivery.customerPhone}</p>
      <p>Customer Address: {delivery.customerAddress}</p>
      <p>Additional Notes: {delivery.additionalNotes || "N/A"}</p> {/* Handle null notes */}
      <ul>
        {delivery.products.map((product) => (
          <li key={product.id}>
            <p>Product Title: {product.title}</p>
            <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </li>
        ))}
      </ul>
      <hr />
    </div>
  ));

  return (
    <>
    <div><button onClick={handleBack}>Back</button></div>
   <div>
      <h1>Deliveries</h1>
      {deliveryListItems}
      {error && <p>Error fetching deliveries: {error.message}</p>}
    </div>
        
    
    </>
  );
};

export default ViewDeliveries;