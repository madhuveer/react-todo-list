import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ItemSet({ item, index, completeItems,isChecked, removeItem }) {
  
    return (
        <tr className={!item.completed? undefined: 'hidden' } >
    <td  >     <input type = "checkbox" checked={isChecked==index}  style= {{marginLeft: '50px',
    marginTop: '10px'}}  onChange={() => completeItems(index+1) } /></td> 
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