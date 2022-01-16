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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
