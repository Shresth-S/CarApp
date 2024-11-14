import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import UpdateCar from './pages/UpdateCar';
import Car from './pages/Car';
import Search from './pages/Search';
import CreateCar from './pages/CreateCar';

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path='/search' element={<Search/>}/>
        <Route path="/car/:carId" element={<Car />} />
        
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-car" element={<CreateCar />} />
          <Route path="/update-car/:carId" element={<UpdateCar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
