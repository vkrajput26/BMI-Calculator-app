


import React from 'react';
import { useState } from 'react';

const CalculateBMI = () => {
    const [height,setHeight]= useState("")
    const [weight,setWeight]= useState("")
    const handleSubmit=()=>{
        const payload={    
            height,
            weight
        }
       fetch("http://localhost:8000/calculate",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
       })
       .then((res)=>res.json())
       .then((res)=> {
     
        console.log(res.token)
       })
    }
    return (
        <div>
           <h1>BMI page</h1>
           <input type="text" placeholder='height' onChange={(e)=>setHeight(e.target.value)}  /> 

           <input type="text" placeholder='weight' onChange={(e)=>setWeight(e.target.value)}  /> 
   <button onClick={handleSubmit}> Calculate BMI</button>
        </div>
    );
};

export default CalculateBMI;