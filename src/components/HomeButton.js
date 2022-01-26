import './Todo.css';
import { Link }  from 'react-router-dom';

export default function HomeButton({}) {
  
    return (
        <Link to="/" >

        <button className="linkClass" style={{ marginLeft: '40% ',marginRight:'2%'}}  >Home</button>
        </Link>
    );
}