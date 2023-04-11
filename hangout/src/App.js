import './App.css';
import {BrowserRouter,Routes,Route,}from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/signUp';
import Home from './pages/home'

function App() {
  return (
   <div>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>

    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
