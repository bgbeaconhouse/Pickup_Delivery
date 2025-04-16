import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewPickups = () => {
  const [error, setError] = useState(null);
  const [pickups, setPickups] = useState([]);
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    async function fetchPickups() {
      try {
        const response = await fetch("http://localhost:3000/api/pickups")
        const result = await response.json();
        console.log(result)
        setPickups(result)
      } catch (error) {
        setError(error)
      }
    }
    fetchPickups();
  }, []);

  const handleBack = () => {
    navigate('/home'); // Navigate to /home
  };

  const pickupListItems = pickups.map((pickup) => (
    <div key={pickup.id}>
      <p>Pickup Date: {new Date(pickup.pickupDate).toLocaleDateString()}</p>
      <p>Customer Name: {pickup.customerName}</p>
      <ul>
        {pickup.products.map((product) => (
          <li key={product.id}>
            <p>Product Title: {product.title}</p>
            <img src={product.imageUrl} alt={product.title} style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </li>
        ))}
      </ul>
      <hr /> {/* Adds a visual separator between pickups */}
    </div>
  ));

  return (
    <>

<div><button onClick={handleBack}>Back</button></div>
    <div>
    <h1>Pickups</h1>
    {pickupListItems}
    {error && <p>Error fetching pickups: {error.message}</p>}
  </div>
        
    
    </>
  );
};

export default ViewPickups;