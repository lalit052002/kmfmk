 
import React from 'react' 
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home' 
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Add from './components/Add.js'

import { ToastContainer } from 'react-toastify';

const App = () => {
 

return (
  <>
 <Router>
 <ToastContainer position="top-center" />
   
        <Routes>
          
          <Route exact path='/' element={<Home/>} /> 
          
             
            <Route exact path='/add' element={<Add />} />
            <Route exact path='/update/:id' element={<Add />} /> 

 
        </Routes>
      
      </Router>
    </>
)
}

export default App
