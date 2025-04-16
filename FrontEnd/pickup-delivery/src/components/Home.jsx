import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Home = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleViewPickupsClick = () => {
    navigate('/viewpickups');
  };

  const handleViewDeliveriesClick = () => {
    navigate('/viewdeliveries'); // New function for deliveries
  };

  return (
    <>
      <button>Create New Pick Up</button>
      <button>Create New Delivery</button>
      <button onClick={handleViewPickupsClick}>View Pick Ups</button>
      <button onClick={handleViewDeliveriesClick}>View Deliveries</button> {/* Added onClick */}
    </>
  );
};

export default Home;
