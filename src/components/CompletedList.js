import React,{ useState } from 'react';
import './Todo.css';
import { FileUploader } from "react-drag-drop-files";
import { Link }  from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ModelMs  from './ModelMs';
import HomeButton from './HomeButton';


function CompletedItem({ item, index, removeItem }) {
  return (
      <tr className={item.completed? undefined: 'hidden' } >
  
        <td  >{item.name}</td>    

        <td>{item.price}</td>   

<td > 
<div
          className="item"> 
          <img
          className="placeholder"
          src={item.imageUrl}
         
        />
        </div>
        </td>
        <td >
          <button style={{ background: "red" }} onClick={() => removeItem(index)}>x</button>
          
        
</td>
   </tr>   
  );
}


function CompletedList() {
  const [items,show,handleClose,handleOk,getClassNamesFor,requestSort,isChecked,removeItem,addItem,completeItems]=ModelMs();

    return (
        <div className="todo-container"  >
             <table style={{ marginLeft: '25% ',width:'80%'}}>
    
      <thead>
        <tr>
    
          <th > 

            <button
              type="button"  className="linkClass"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name',0)}
              >
              Name
            </button>
          </th>
          <th >
            <button
              type="button"  className="linkClass"
              onClick={() => requestSort('price')}
              className={getClassNamesFor('price',1)}
            >
              Price
            </button>
          </th>
          <th>
           
             Image
           
          </th>
          <th>
           
             Remove Item
           
          </th>
        </tr>
      </thead>
      <tbody>
            
   

{items.map((item, index) => (
                    <CompletedItem
                    item={item}
                    index={index}
                   
                    removeItem={removeItem}
                    key={index}
                  
                    />
                ))}

</tbody>
    </table>
            
            <div className="create-item"   >
            <HomeButton/>
       
            <Link to="/todo" className="linkClass">
                <button className="linkClass"  style={{ marginLeft: ' 5%',marginTop:'2%'}}   > View Pending Items</button>
                </Link>
            </div>
         
      
    
           
        </div>
    );
}

export default CompletedList;