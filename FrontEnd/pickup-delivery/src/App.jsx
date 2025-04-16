import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route} from "react-router-dom"

function App() {
  const [count, setCount] = useState(0)
  const [deliveries, setDeliveries] = useState(null)
  const [pickups, setPickups] = useState(null)
  const [users, setUsers] = useState(null)
const [products, setProducts] = useState(null)



useEffect(() => {
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/api/products")
      const result = await response.json();
      console.log(result)
     setProducts(result)
    } catch (error) {
      setError(error)
    }
  }
  fetchProducts();
}, []);

useEffect(() => {
  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/users")
      const result = await response.json();
      console.log(result)
      setUsers(result)
    } catch (error) {
      setError(error)
    }
  }
  fetchUsers();
}, []);

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



  return (
    <>

      <div><h1>Beacon House Thrift Shop Pick Ups & Deliveries</h1></div>
      <div><button>Log In</button></div>



     <div>
        
        <h1>Products</h1>
        <ul>
        {products && products.map(product => (
          <li key={product.id}> Item: {product.title} Description: {product.description} </li>
        ))}
        </ul>
        </div>
        <div>
          <h1>Users</h1>
          <ul>
            {users && users.map(user => (
              <li key={user.id}>Email: {user.email}</li>
            ))}
          </ul>
        </div>
        <div>
  <h1>Pick Ups</h1>
  <ul>
    {pickups && pickups.map(pickup => (
      <li key={pickup.id}>
        {pickup.pickupDate} {pickup.customerName} {pickup.customerPhone}
        {pickup.products && pickup.products.map(product => (
          <span key={product.id}>
            {product.title} {product.description && `- ${product.description}`}
          </span>
        ))}
      </li>
    ))}
  </ul>
</div>
    
        <div>
          <h1>Deliveries</h1>
          <ul>
            {deliveries && deliveries.map(delivery => (
              <li key={delivery.id}>{delivery.customerName} {delivery.deliveryDate}</li>
            ))}
          </ul>
        </div>
    </>
  )
}

export default App
