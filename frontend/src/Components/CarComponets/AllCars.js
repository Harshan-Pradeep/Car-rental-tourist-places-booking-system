
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllCars() {
    //use useState hook to save fetch data
    const [cars, setCars]=useState([]);
    
    //get data from backend
    useEffect(()=>{
        axios.get("http://localhost:8000").then((response)=>{
            setCars(response.data);
            console.log(cars);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
  return (
    <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Vehicle Name</th>
            <th scope="col">Vehicle Type</th>
            <th scope="col">Fuel Type</th>
            <th scope="col">Seats</th>
            <th scope="col">Image</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>

        {cars.map((car,index) => (
          <tr key={car._id}>
            <th scope="row">{index+1}</th>
            <td>{car.name}</td>
            <td>{car.type}</td>
            <td>{car.fuelType}</td>
            <td>{car.seats}</td>
            <td><img style={{width:"60px",height:"60px", borderRadius:"25px"}} src={`http://localhost:8000/${car.image}`}/></td>
            <td>RS.{car.price}</td>
            
          </tr>
        ))}

        </tbody>
      </table>
   
  )
}

export default AllCars
