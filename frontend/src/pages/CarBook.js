import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import carSeats from "../images/carHome/seats.png"
import carFuel from "../images/carHome/fuel.png"
import carType from "../images/carHome/type.png"
import previousIcon from '../images/carHome/previous.png'




const CarBook = () => {
    const { id } = useParams();

     //use useState hook to save fetch data
     const [cars, setCars]=useState([]);

     //get data from backend
     useEffect(()=>{
         axios.get(`http://localhost:8000/find/${id}`).then((response)=>{
             setCars(response.data);
         }).catch((err)=>{
             console.log(err)
         })
     },[])

     //set user data
  const [userData, setuserData]=useState({
    vehicle:"",
    name:"",
    contactNumber:"",
    address:"",
    days:""
  });

  //handle onChange inputes 
  const handleOnChange=(event)=>{
    setuserData({
      ...userData,
      [event.target.name]:event.target.value
    });
  }
  const handleName=(name)=>{
    setuserData({
        ...userData,
        vehicle:name
    })
  }

  // handle submit
  const handleSubmit=(event)=>{
    event.preventDefault();
    console.log(userData);
    axios.post('http://localhost:8000/carbooking/add',userData).then((response)=>{
      alert(response.data);
    }).catch((error)=>{
      console.log(error)
    });

  }
  return (
    <div style={styles.mainContainer}>
      <div>
        <Link to={"/"}><img style={{width:64, height:64,position:'relative',marginTop:"-650px", marginLeft:"-100px"}} src={previousIcon} /></Link>
      </div>
        <div style={styles.container}>
            <div style={styles.leftContainer}>
                <div style={styles.title}>
                    <p>{cars.name}</p>
                </div>
                <div style={styles.imageContainer}>
                    <img style={styles.image} src={`http://localhost:8000/${cars.image}`} />
                </div>
                <div style={styles.features}>
                    <p><img src={carSeats}/> {cars.seats}</p>
                    <p><img src={carFuel}/> {cars.fuelType}</p>
                    <p><img src={carType}/> {cars.type}</p>
                </div>
                <div style={styles.priceDiv}>
                    <p style={styles.price}>LKR :{cars.price} Per/Day</p>

                </div>

            </div>
            <div style={styles.rightContainer}>
                <div style={styles.rightContainerTitle}>
                    <p> Booking Form</p>
                </div>

                <div>
                    <div class="mb-3 p-4">
                        <form onSubmit={handleSubmit}>
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name='name' placeholder="Kasun" onChange={handleOnChange}/>

                            <label for="contactNumber" class="form-label">Contact Number</label>
                            <input type="text" class="form-control" name='contactNumber' placeholder="+94 XXX XXX" onChange={handleOnChange}/>

                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" name='address' placeholder="Colombo" onChange={handleOnChange}/>

                            <label for="days" class="form-label">For how many days?</label>
                            <input type="text" class="form-control" name='days' placeholder="3" onChange={handleOnChange}/>

                        
                            <button type='submit' class="btn btn-success mt-3" onClick={()=>handleName(cars.name)}>Book Now</button>
                        </form>
                    </div>
                </div>

            </div>

        </div>
    </div>
         
  )
}

const styles={
    mainContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        height:"100vh"
    },
    container:{
        width:"80%",
        height:"80vh",
        backgroundColor:"white",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        borderRadius:"25px",
        display:"flex",
        
    },
    leftContainer:{
        width:"30%",
        height:"100%",
    },
    title:{
        textAlign:"center",
        fontSize:"30px",
        fontWeight:"bold"

    },
    imageContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"10px"
    },
    image:{
        width:"90%",
        height:"50vh",
        borderRadius:"25px"
    },
    features:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:25,
        marginTop:"20px"
    },
    price:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:"30px"
    },
    rightContainer:{
        width:"70%",
        height:"100%"
    },
    rightContainerTitle:{
        textAlign:"center",
        fontWeight:"bold",
        fontSize:'30px'
    },

}




export default CarBook
