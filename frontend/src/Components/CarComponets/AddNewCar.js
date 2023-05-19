import React, {useState} from 'react'
import axios from "axios";

function AddNewCar() {
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

    axios.post('http://localhost:8000/add',carData,{
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
  //handle Image onChange input
  const handleImageOnChange= async(event)=>{
    const file=event.target.files[0];
    //const base64=await convertToBase64(file);
    setCarData({
      ...carData,
      image:file
  
    })
  }

  return (
      <div>
        <div class="mb-3">
          <form onSubmit={handleSubmit}>
              <label for="name" class="form-label">Vehicle Name</label>
              <input type="text" class="form-control" id="name" name='name' placeholder="Toyota" onChange={handleOnChange}/>

              <label for="type" class="form-label">Vehicle type</label>
              <input type="text" class="form-control" id="name" name='type' placeholder="SUV" onChange={handleOnChange}/>

              <label for="fuelType" class="form-label">FuelType type</label>
              <input type="text" class="form-control" id="name" name='fuelType' placeholder="Diesel / Petrol" onChange={handleOnChange}/>

              <label for="price" class="form-label">Price </label>
              <input type="text" class="form-control" id="name" name='price' placeholder="price" onChange={handleOnChange}/>

              <label for="seats" class="form-label">Seats</label>
              <input type="text" class="form-control" id="name" name='seats' placeholder="6" onChange={handleOnChange}/>

              <label for="image" class="form-label">Image</label>
              <input type="file" class="form-control" id="name" name='image' accept='.jpg, .png, .jpeg'  onChange={handleImageOnChange}/>

              <button type='submit' class="btn btn-success mt-2">Add new Car</button>
          </form>
            
        </div>
    
      </div>
    
  )
}

export default AddNewCar

