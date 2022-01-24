import React,{ useState } from 'react';
import './Todo.css';
import { FileUploader } from "react-drag-drop-files";
import { Link }  from 'react-router-dom';
import { useCookies } from 'react-cookie';


var showPending=true;


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

var isAsc=true;
function CompletedList() {
  const [cookies, setCookie] = useCookies(['ItemList']);
  const [sortConfig, setSortConfig] = React.useState([{name:'name',direction:'descending'}]);
  let dbData=    cookies.ItemList;
    const [items, setItems] = useState(
      dbData
    );

    const requestSort = (key) => {

      let dir = 'ascending';
        if(isAsc)
        {
            const    sorted=  [...items].sort((a, b) =>( b[key] > a[key])?1:-1);
            setItems(sorted);
            dir = 'descending';
        }
        else{
            const       sorted=  [...items].sort((a, b) =>(b[key] > b[key])?1:-1);
            setItems(sorted);
            dir = 'ascending';
        }
        isAsc=!isAsc;
        setSortConfig({name:key,direction:dir});
       
    };

    const removeItem = index => {
        const newItems = [...items];
        newItems.splice(index, 1);
        let expires = new Date();
      expires.setTime(expires.getTime()+(10*60*60*1000));
      setCookie('ItemList',JSON.stringify(newItems), { path: '/',  expires});
        setItems(newItems);
    };

    
 
    const getClassNamesFor = (name,index) => {
      if (!sortConfig) {
        return;
      }
      return sortConfig.name === name ? sortConfig.direction : undefined;
    };

  

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
              Price($)
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
            <Link to="/" >

<button className="linkClass" style={{ marginLeft: '40% ',marginRight:'2%'}}  >Home</button>
</Link>
       
            <Link to="/todo" className="linkClass">
                <button className="linkClass"  style={{ marginLeft: ' 5%',marginTop:'2%'}}   > View Pending Items</button>
                </Link>
            </div>
         
      
    
           
        </div>
    );
}

export default CompletedList;