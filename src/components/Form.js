import React, {useState} from 'react'
import Axios from 'axios'
import "./css/style.css"
import "./css/animate.css"
// import Alert from '@material-ui/lab/Alert';
// import AlertTitle from '@material-ui/lab/AlertTitle';



function PostForm(props){
    const url = "http://fueled.pythonanywhere.com/add_car"
    
    const [data,setData] = useState({
        car_number : "",
        password : ""
    })

    function handle(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    
    async function submit(e){
        e.preventDefault()
        await fetch(url, {
      
            // Adding method type
            method: "POST",
              
            // Adding body or contents to send
            body: JSON.stringify({
                car_number:data.car_number,
                password:data.password
            }),
              
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {
            if(json.status === "success"){
                alert("OK! SUCCESS : This car can be filled up with fuel")
            }
            if(json.status === "error"){
                alert("NO! FAILED : This car was filled up with fuel recently")
            }
            if(json.status === "wrong_password"){
                alert("PASSWORD! ERROR : Wrong password")
            }
        })
        .catch(e=>{
            alert(e.message)
        })
    }
    
    return(
        <div class="container">
            <div class="top">
                <h1 id="title" class="hidden"><span id="logo">FUELED</span></h1>
            </div>
            <div class="login-box animated fadeInUp">
                <div class="box-header">
                    <h2>Add Car</h2>
                </div>
                <form onSubmit={(e)=>submit(e)} id="form">
                    
                    <label for="car_number">Car Number</label>
                    <br/>
                    <input onChange={(e)=>handle(e)} id="car_number" value={data.car_number} type="text" placeholder="B123456"></input>
                    <br />
                    
                    <label for="password">Password</label>
                    <br/>
                    <input onChange={(e)=>handle(e)} id="password" value={data.password} type="password" placeholder="Password"></input>
                    <br />
                    
                    <button>Submit</button>
                    <br />
                </form>
            </div>
        </div>
    );
}

export default PostForm;