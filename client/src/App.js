import './App.css';
import { BrowserRouter as Router, Link, Route, Routes, NavLink } from 'react-router-dom';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import LayoutUser from './Components/LayoutUser';
import RequestList from './features/request/listRequest';
import LayoutManeger from './Components/LayoutMenager';
import RequestListManeger from './features/request/listRequestManeger';
import ListUsers from './features/user/listUsers';
import ListLoanManeger from './features/loan/listLoanManeger';
import ListLoanUser from './features/loan/listLoanUser';
import PrivateArea from './features/user/privateArea';
import HomePage from './Components/HomePage';

function App() {
  return (
    <div className="App">
   <Router>
     <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
       <Route path='/layoutUser' element={<LayoutUser />} >
      <Route path='request' element={<RequestList/>} /> 
      <Route path='loan' element={<ListLoanUser/>} /> 
      <Route path='privateArea' element={<PrivateArea/>} /> 
      <Route path='about' element={<HomePage/>} /> 
      </Route>
      <Route path='/layoutManeger' element={<LayoutManeger />} >
      <Route path='request' element={<RequestListManeger/>} /> 
      <Route path='user' element={<ListUsers/>} /> 
      <Route path='loan' element={<ListLoanManeger/>} /> 
      <Route path='privateArea' element={<PrivateArea/>} /> 
      </Route>
    </Routes>
  </Router> 
    </div>
  )
}

export default App;
