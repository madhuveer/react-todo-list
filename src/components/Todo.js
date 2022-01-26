import './Todo.css';
import { Link }  from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import ModelMs  from './ModelMs';
import ItemSet from './ItemSet';
import HomeButton from './HomeButton';
import CreateItem from './CreateItem';


function Todo() {
 const [items,show,handleClose,handleOk,getClassNamesFor,requestSort,isChecked,removeItem,addItem,completeItems]=ModelMs();
    return (
        <div className="todo-container"  >
             <table   className={items.length>0? undefined: 'hidden' }   style={{ marginLeft: '8% ',width:'80%'}}>
    <Modal show={show} onHide={handleClose} backdrop='static' keyboard="False">
        <Modal.Header closeButton>
          <Modal.Title>Complete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do u want to complete Item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOk}>
            Yes
          </Button>
          <Button variant="primary" onClick={handleClose}>
          No
          </Button>
        </Modal.Footer>
      </Modal>
      <thead>
        <tr>
        <th>
             Select Items 
          </th>
          <th > 
            <button
              type="button"  className="linkClass"
              onClick={() => requestSort('name')}
              className={getClassNamesFor('name',0)} >
              Name
            </button>
          </th>
          <th >
            <button
              type="button"  className="linkClass"
              onClick={() => requestSort('price')}
              className={getClassNamesFor('price',1)
            } >
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
                    <ItemSet
                    item={item}
                    index={index}
                    completeItems={completeItems}
                    isChecked={isChecked}
                    removeItem={removeItem}
                    key={index}
                    />
                ))}
</tbody>
    </table>
              <div className="create-item"   >
                <CreateItem addItem={addItem} />         
            </div>
         <HomeButton/>
            <Link to="/completedItems" className="linkClass">
            <button   className="linkClass"  style={{ marginLeft: ' 2% ',marginTop:'2%'}}  > View Completed Items</button>
    </Link>
     </div>
        
    );
}

export default Todo;