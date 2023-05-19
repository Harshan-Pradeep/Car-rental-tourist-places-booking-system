
import React from 'react';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import CarAdminDashboard from './pages/CarAdminDashboard';
import CarHome from './pages/CarHome';
import CarBook from './pages/CarBook';
import PlaceHome from './pages/PlaceHome';
import PlaceBooking from './pages/PlaceBooking';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={CarHome} />
        <Route path='/place' exact Component={PlaceHome} />
        <Route path='/admin' exact Component={CarAdminDashboard} />
        <Route path='/book/:id' exact Component={CarBook} />
        <Route path='/details/:id' exact Component={CarBook} />
        <Route path='/place/details/:id' exact Component={PlaceBooking} />
        <Route path='/place/book/:id' exact Component={PlaceBooking} />
      </Routes>
    </Router>

 
  );
}

export default App;
