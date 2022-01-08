import React,{ useState } from 'react';
import './Todo.css';
import { FileUploader } from "react-drag-drop-files";
import { Link }  from 'react-router-dom';


const fileTypes = ["JPG", "PNG", "GIF"];
var hidden=true;

function Item({ item, index,  removeItem }) {
    return (
        <tr >
          <input type = "checkbox"  style= {{marginLeft: '50px',
    marginTop: '10px'}}/>
          <td  style={{ textAlign: 'center'}} >{item.name}</td>    

          <td style={{ textAlign: 'center'}}>{item.price}</td>   

<td style={{ textAlign: 'center'}}> 
<div
            className="item"> 
            <img
            className="placeholder"
            src={item.imageUrl}
            style= {{ marginRight: '120px'}}
          />
          </div>
          </td>
          <td style={{ textAlign: 'center'}}>
            <button style={{ background: "red" }} onClick={() => removeItem(index)}>x</button>
          
</td>
     </tr>   
    );
}
var name="", price="",image1;
function CreateItem({ addItem }) {


    const [style, setStyle] = useState("hidden");

const [file, setFile] = useState(null);
const handleChange = (file) => {
  setFile(file);
  image1=file;
  console.log(file);
  
};

    const handleSubmit = e => {
        e.preventDefault();
        if(hidden)
        {
            hidden=false;
            setStyle("visible");
            return;
        }
        if (!name) return;
        addItem(name,price,image1);
        hidden=true;
        name="";
        price="";
        image1=undefined;
        setStyle("hidden");
        setFile(undefined);
   //     name="";
     //   price="";
		
    }
    return (
        <form >
            
            <div className={hidden? 'hidden' : undefined}>
           <div class="row">
            <input
                type="text"
                className="input"
               
                placeholder="Name"
                onChange={e =>name=e.target.value}
            />
			      <input
                type="text"
                className="input"
           
                placeholder="Price"
                onChange={e => price=e.target.value}
            />
          
          <FileUploader handleChange={handleChange} name="file" types={fileTypes}  
            />
      <p  style= {{marginRight:'40rem'}}>{file ? `File name: ${file.name}` : "no files uploaded yet" }</p>
      </div>
      </div>
      
      <br></br>
			   <button  style={{ marginLeft: '45% '}}  onClick={handleSubmit}>Add Item</button>

         <div>
     

      

       <Link to="/completedItems" >

        <button > View Completed Item</button>
      </Link>
      
      </div>

        </form>
    );
}
var isAsc=true;
function Todo() {

    const [items, setItems] = useState([
       
    ]);




    const addItem = (name,price,image) => {
        let imageUrl=null;
        if(image)
        {
         imageUrl = URL.createObjectURL(image);
        }
        const newItem = [...items, { name, price, imageUrl ,completed: false }];
        setItems(newItem);
    };

    const requestSort = (key) => {

        
        if(isAsc)
        {
            const    sorted=  [...items].sort((a, b) =>( b[key] > a[key])?1:-1);
            setItems(sorted);
        }
        else{
            const       sorted=  [...items].sort((a, b) =>(b[key] > b[key])?1:-1);
            setItems(sorted);
        }
        isAsc=!isAsc;
       
    };

    const removeItem = index => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    return (
        <div className="todo-container"  >
             <table style={{ marginLeft: '8% ',width:'80%'}}>
    
      <thead>
        <tr>
        <th>
           
            Select Items
           
          </th>
          <th > 

            <button
              type="button"
              onClick={() => requestSort('name')}
              >
              Name
            </button>
          </th>
          <th >
            <button
              type="button"
              onClick={() => requestSort('price')}
             
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
                    <Item
                    item={item}
                    index={index}
                    
                    removeItem={removeItem}
                    key={index}
                    />
                ))}

</tbody>
    </table>
            
            <div className="create-item"   >
                <CreateItem addItem={addItem} />
            </div>
        </div>
    );
}

export default Todo;