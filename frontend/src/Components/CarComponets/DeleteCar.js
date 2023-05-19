import React, {useState, useEffect} from 'react';
import axios from "axios";


function DeleteCar() {
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

   //handle delete car 
   const handleDelete=(id)=>{
    axios.delete(`http://localhost:8000/delete/${id}`).then((response)=>{
      
      alert(response.data);
      setCars(cars.filter((car)=>car._id !==id));

    }).catch((error)=>{
      alert(error)
    })

  }
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
           <th scope="col">Action</th>
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
           <td> 
              <button type="button" class="btn btn-danger" onClick={()=>handleDelete(car._id)}>Delete</button>
            </td>
           
         </tr>
       ))}

       </tbody>
     </table>
  
 )

}

export default DeleteCar
