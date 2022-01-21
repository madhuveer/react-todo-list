import React from 'react';
import shopping from './images/shopping.png';
import logo from './images/logo.svg';
import './App.css';
import { Link }  from 'react-router-dom';
function Header(props){
  return (
<>
<section> 
 <img src={logo} 
 alt=" EIKA Logo"  
 class= "Image1" /> 

 <img src={shopping} 
 alt=" Image"  
 class= "Image2" /> 

 <div class= "paragraph">
 <h2 class="heading"> {props.name} </h2>
 <p class="p1"> Welcome to EIKA's shopping list. Here you will be <br />
     able to create a todo list with for the furniture you <br /> 
     want to buy.</p>
 <p>To get started press the Add new item then it will take <br />
    you to next page, where you can add your todo list with <br />
    name, price, and you can also upload image by clicking  <br />  
    on Image icon.To add todo list click on Add Item button</p>
    </div>
</section> 
  </>

  );
  
}



function Footer(props){
  return (
 <p> CopyRight {props.year}</p>

  );
}
 function App() {
 return (
   
    <div className="App">
    
     <Header name=" EIKA's shopping list" />
    
     <div>
     
       <Link to="/todo" className="linkClass">

        <button className="linkClass"> Add new item </button>
      </Link>
      
      </div>
     <Footer year={new Date().getFullYear()}/>

    </div>
    
  );
}

export default App;
