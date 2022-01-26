import React,{ useState } from 'react';
import './Todo.css';
import { FileUploader } from "react-drag-drop-files";
import 'bootstrap/dist/css/bootstrap.min.css';

const fileTypes = ["JPG", "PNG", "GIF"];
var hidden=true;

export default function CreateItem({ addItem }) {
 
const [style, setStyle] = useState("hidden");
const [file, setFile] = useState(null);
const [name, setName] = useState();
const [price, setPrice] = useState(0);
const handleChange = (file) => {
  setFile(file);
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
        addItem(name,price,file);
        hidden=true;
      
        setStyle("hidden");
        setFile(null);
        setName("");
        setPrice(0);
		
    }
    return (
        <form >
            
            <div className={hidden? 'hidden' : undefined} style={{ marginLeft: '14% '}}>
           <div className="row">
            <input
                type="text"
                className="input"
                placeholder="Name"
                onChange={event => setName(event.target.value)}
                value={name}
            />
			      <input
                type="number"
                className="input"
                 min="1"
                placeholder="Price"
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
          <div style={{ marginLeft: '2% '}}>
          <FileUploader   handleChange={handleChange} name="file" types={fileTypes}  
            />
      <p  style= {{marginRight:'40rem'}}>{file ? `File name: ${file.name}` : "no files uploaded yet" }</p>
      </div>
      </div>
      </div>
           <br></br>   
			   <button className="btn btn-primary"  style={{ marginLeft: '42% '}}   onClick={handleSubmit}>Add Item</button>       
         <div>          
      </div>
        </form>
    );
}