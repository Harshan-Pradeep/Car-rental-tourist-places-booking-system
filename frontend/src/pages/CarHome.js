
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import image1 from '../images/carousel/1.jpg';
import image2 from '../images/carousel/2.jpg';
import image3 from '../images/carousel/3.jpg';
import carSeats from "../images/carHome/seats.png"
import carFuel from "../images/carHome/fuel.png"
import carType from "../images/carHome/type.png"


function CarHome() {
    //use useState hook to save fetch data
    const [cars, setCars]=useState([]);
    const [types, setTypes]=useState([]);
    const [selectedType, setSelectedType]=useState("All")

    //get data from backend
    useEffect(()=>{
        axios.get("http://localhost:8000").then((response)=>{
            setCars(response.data);
        }).catch((err)=>{
            console.log(err)
        })
    },[])

    useEffect(() => {
        const carTypes = cars.map((carType) => carType.type);
        const uniqueTypes = [...new Set(carTypes)];
        setTypes(uniqueTypes);
      }, [cars]);
      console.log(types);

      //handle option on change
      const handleOptionOnChange=(e)=>{
        setSelectedType(e.target.value);
        

      }
      console.log(selectedType)

  return (
    <div>

    {/* nav bar */}
        <div>
            <nav  style={{boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.25)',}} class="navbar navbar-expand-lg  ">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Cars</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/place">Places</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>

    {/* carousel */}

        <div>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                    <img src= {image1} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                    <img src={image2} class="d-block w-100" alt="..." />
                    </div>
                    <div class="carousel-item">
                    <img src={image3} class="d-block w-100" alt="..." />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
        </div> 

        <h1 style={styles.title}>Rent A <span style={styles.carSpan}>Car</span></h1>

        <div style={styles.optionContainer}>
            <p style={styles.optionTitle}>Select Car Type</p>
            <select style={styles.selectContainer}  onChange={handleOptionOnChange}>
            {types.map((option) => (
            <option key={option}>{option}</option>
            ))}
            <option value="All">All</option>
            </select>
        </div>

       

        {/* grid container */}
        
        <div style={styles.carGrid}>
            {cars.map((car,index) => {
                if(selectedType===car.type){
                    return(
                        <div key={car._id} style={styles.card}>
                            <div>
                                <p style={styles.carName}>{car.name}</p>
                            </div>
                            <div >
                                <img style={styles.cardImage} src={`http://localhost:8000/${car.image}`} />
                            </div>
                            <div>
                                <p style={styles.carPrice}>LKR {car.price}</p>
                            </div>
                        
                            <div style={styles.carFeatures}>
                                <p><img src={carSeats}/> {car.seats}</p>
                                <p><img src={carFuel}/> {car.fuelType}</p>
                                <p><img src={carType}/> {car.type}</p>
                            </div>
                        
                            <div style={styles.buttonSection}>
                                <button style={styles.button}><Link to={`/book/${car._id}`} style={styles.buttonText}>Book Now</Link></button>
                                <button style={styles.button}><Link to={`/details/${car._id}`} style={styles.buttonText}>Details</Link></button>
                            </div>
                        </div>  

                    )
                }else if(selectedType==="All"){
                    return(
                        <div key={car._id} style={styles.card}>
                            <div>
                                <p style={styles.carName}>{car.name}</p>
                            </div>
                            <div >
                                <img style={styles.cardImage} src={`http://localhost:8000/${car.image}`} />
                            </div>
                            <div>
                                <p style={styles.carPrice}>LKR {car.price}</p>
                            </div>
                        
                            <div style={styles.carFeatures}>
                                <p><img src={carSeats}/> {car.seats}</p>
                                <p><img src={carFuel}/> {car.fuelType}</p>
                                <p><img src={carType}/> {car.type}</p>
                            </div>
                        
                            <div style={styles.buttonSection}>
                                <button style={styles.button}><Link to={`/book/${car._id}`} style={styles.buttonText}>Book Now</Link></button>
                                <button style={styles.button}><Link to={`/details/${car._id}`} style={styles.buttonText}>Details</Link></button>
                            </div>
                        </div>  


                    )
                        
                }

            }
           
           
                
            )}    
        </div>
        
    </div>
    
  )
}

const styles={
    title:{
        color:"red",
        textAlign:"center",
        fontWeight:"bold",
        marginTop:"50px"
    },
    carSpan:{
        color:'black',
        fontWeight:"bold"
    },
    carGrid:{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        rowGap: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '20px',
        marginBottom:"50px"
    },
    card:{
        width:"300px",
        height:"500px",
        backgroundColor:"white",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        borderRadius:"25px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        marginLeft:"50px",
        padding:"10px",
        marginTop:"20px",

        
    },
    cardImage:{
        width:"280px",
        height:"250px",
        borderRadius:"25px",
     
    },
    carFeatures:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:20,
        marginTop:"-5px"
    },
    carName:{
        fontSize:"30px",
        fontWeight:"bold",
        marginTop:"-20px"
    },
    buttonSection:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        gap:"40px",

    },
    button:{
        borderRadius:"25px",
        backgroundColor:"#088395",
        color:"white",
        border:"none",
        width:"110px",
        height:"40px",
        marginBottom:"-20px"
       
    },
    buttonText:{
        color:"white",
        textDecoration:"none",
        padding:"10px"
    },
    carPrice:{
        fontSize:"30px",
        fontWeight:"500",
        marginTop:"15px"
    },
    optionContainer:{
        width:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        margin:"30px 0px"
    },
    selectContainer:{
        width:"200px",
        textAlign:"center",
        borderRadius:"25px",
        backgroundColor:"white",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.70)",
        border:"0px",
    },
    optionTitle:{
        fontSize:"20px",
        fontWeight:"600",
    },
}
export default CarHome
