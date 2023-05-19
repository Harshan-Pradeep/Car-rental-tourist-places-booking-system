
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UpdateCar() {
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

      // set car id
      const [carId, setCarId]=useState(null);

       //set car data
      const [carData, setCarData]=useState({
        name:"",
        type:"",
        fuelType:"",
        price:"",
        seats:"",
        image:""
      });

    // handle submit
    const handleSubmit=(event)=>{
      event.preventDefault();
      console.log(carData.image);

      axios.put(`http://localhost:8000/update/${carId}`,carData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response)=>{
        alert(response.data);
      }).catch((error)=>{
        console.log(error)
      });

    }

      //handle onChange other inputes 
      const handleOnChange=(event)=>{
        setCarData({
          ...carData,
          [event.target.name]:event.target.value 
        });
      }

     // const handleIdOnChange
      const handleIdOnChange=(event)=>{
        setCarId(event.target.value);

      }

      //handle Image onChange input
      const handleImageOnChange= async(event)=>{
        const file=event.target.files[0];
        setCarData({
          ...carData,
          image:file
      
        })
      }


     

    return (
      <form onSubmit={handleSubmit}>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Mongo ID</th>
              <th scope="col">Vehicle Name</th>
              <th scope="col">Vehicle Type</th>
              <th scope="col">Fuel Type</th>
              <th scope="col">Seats</th>
              <th scope="col">Image</th>
              <th scope="col">New Image</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
  
          {cars.map((car,index) => (
            
              <tr key={car._id}>
                <th scope="row">{index+1}</th>
                <td><input  type="text" class="form-control" name='id' onChange={handleIdOnChange} value={car._id}  /></td>
                <td><input  type="text" class="form-control" name='name' onChange={handleOnChange} defaultValue={car.name}/></td>
                <td><input type="text" class="form-control"  name='type' onChange={handleOnChange} defaultValue={car.type}  /></td>
                <td><input type="text" class="form-control"  name='fuelType' onChange={handleOnChange} defaultValue={car.fuelType}  /></td>
                <td><input type="text" class="form-control"  name='seats'  onChange={handleOnChange} defaultValue={car.seats}  /></td>
                <td><img style={{width:"60px",height:"60px", borderRadius:"25px"}} src={`http://localhost:8000/${car.image}`}/></td>
                <input type="file" class="form-control"  name='image' accept='.jpg, .png, .jpeg'  onChange={handleImageOnChange} />
                <td><input type="text" class="form-control"  name='price'  onChange={handleOnChange} defaultValue={car.price}  /></td>
                <button style={{color:"white",backgroundColor:"green"}} type='submit' class="btn btn-success" >Update</button>
              </tr>
           
          ))}
  
          </tbody>
        </table>
      </form>
      
     
    )
  

}

export default UpdateCar


// function convertToBase64(file){
//   return new Promise((resolve, reject)=>{
//     const fileReader = new FileReader();
//     fileReader.readAsDataURL(file);
//     fileReader.onload=()=>{
//       resolve(fileReader.result)
//     };
//     fileReader.onerror=(error)=>{
//       reject(error)
//     }
//   })


// }
