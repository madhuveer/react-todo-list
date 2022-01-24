import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Todo  from './components/Todo';
import CompletedList from './components/CompletedList';
import { BrowserRouter as Router ,Route ,Routes } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
      <Router>
  <Routes>
    <Route exact path="/" element={ <App/> }></Route>
     <Route  path="/todo" element={ <Todo/> }></Route>
      <Route  path="/completedItems" element={ <CompletedList/> }></Route>
     
     </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
