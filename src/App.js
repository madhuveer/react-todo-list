import React from 'react';

import logo from './logo.svg';
import './App.css';
import { Link }  from 'react-router-dom';
function Header(props){
  return (

<section> 
 <img src={logo} alt=" EIKA Logo"   style= {{marginLeft: '50px',
    marginTop: '50px'}}/> 
 <h2> {props.name} </h2>
 <p> If you want to select Items and add to your cart? Press the Add item button</p>
</section> 
  

  );
  
}



function Footer(props){
  return (
 <p> CopyRight {props.year}</p>

  );
}
 //function clickMe(){
  // console.log("button clicked");
 //}


function App() {


  return (
   
    <div className="App">
    
     <Header name=" Welcome to EIKA " />
    
    
    <div>
     

      

       <Link to="/todo" className="btn btn-primary">

        <button > Add item </button>
      </Link>
      
      </div>
     <Footer year={new Date().getFullYear()}/>

    </div>
    
  );
}

export default App;
