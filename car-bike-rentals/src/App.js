import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import VehicleList from './components/Vehicles/VehicleList';
import VehicleDetail from './components/Vehicles/VehicleDetail';
import BookingForm from './components/Booking/BookingForm';
import Checkout from './components/Booking/Checkout';
import BookingHistory from './components/User/BookingHistory';
import Profile from './components/User/Profile';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          {/* <Route path="/vehicles" component={VehicleList} /> */}
          <Route path='/vehicles' element={<VehicleList />}></Route>
          {/* <Route path="/vehicle/:id" component={VehicleDetail} /> */}
          <Route path='/vehicle/:id' element={<VehicleDetail />}></Route>
          {/* <Route path="/book" component={BookingForm} /> */}
          <Route path='/book/:vehicleId' element={<BookingForm />}></Route>
          {/* <Route path="/checkout" component={Checkout} /> */}
          <Route path='/checkout' element={<Checkout />}></Route>
          {/* <Route path="/history" component={BookingHistory} /> */}
          <Route path='/history' element={<BookingHistory />}></Route>
          {/* <Route path="/profile" component={Profile} /> */}
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/' element={<VehicleList />}></Route>
          {/* <Route path="/" exact component={VehicleList} /> */}
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  )
}

export default App