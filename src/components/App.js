import { Link } from "react-router-dom";
import '../styles/App.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function App(){
    const navigate=useNavigate();
    const[city,setCity]=useState("");
    const EnterData=()=>{
        if(city != ""){
            navigate('/SearchLocation',{state:{Loc:city}})
        }
        else{
            alert("Enter City Name")
        }
        
    }
    return(
        <div className="Container">
            <div className="body-Container">
                <div className="Heading">
                    <h1>Weather Report</h1>
                </div>
                <div className="Logo-img">
                    <img src="https://ayushkul.github.io/react-weather-app/icons/perfect-day.svg"  width={"200px"} height={"200px"}/>
                </div>
                <div className="SearchLocation-Container">
                    <div>
                        <div>
                            <input type="text" placeholder="Ex:Delhi" className="Input-field" value={city} onChange={(e)=>setCity(e.target.value)} required/>
                           <button className="SearchLocation-btn" onClick={()=>EnterData()}>SearchLocation</button>
                        </div>
                    </div>
                </div>
                <div className="CurrentLocation-Container">
                    <Link to='CurrentLocation'><button className="CurrentLocation-btn">CurrentLocation</button></Link>
                </div>
            </div>
            
        </div>
    );
}
export default App;

// value={city} onChange={(e)=>setCity(e.target.value)}
